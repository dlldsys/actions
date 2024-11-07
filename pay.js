const xlsx = require('node-xlsx')
const _ = require('lodash');
const fs = require('fs')
const dayjs = require('dayjs');

const configDefault = fs.readFileSync(__dirname + '/default.json')
console.log(JSON.parse(configDefault.toString()));
const configDefaultJson=JSON.parse(configDefault.toString());
const filenames = fs.readdirSync(__dirname);
console.log("\nCurrent directory filenames:");

const excelTitle = ['时间', '类型', '平台', '金额', '交易方', '单号', 'Other_Info', '', '']
const exportExcel = [excelTitle];

async function formatExcel(fileName) {
    const sheets = xlsx.parse(fileName);
    console.log(fileName)
    let dataFormat = [];
    let exportData = [];
    let insert = false;
    for (const item of sheets[0].data) {
        if (item[0] == '交易时间') {
            insert = true;
        }
        if (insert && item[0]) {
            dataFormat.push(item);
        }
    }
    if (fileName?.includes('微信')) {
        dataFormat = dataFormat.filter(b => b.join(',').includes('支付成功') && b.join(',').includes(`支出`));
        for (const item of dataFormat) {
            let key='';
            for (const js of configDefaultJson) {
                const matchStr= item.join(',');
                for (const val of js.value) {
                    if(val&&matchStr.includes(val)){
                        key=js.key;
                    }
                }
            }
            exportData.push([item[0],key||"其它", '微信', item[5], item[2]+'-'+item[3], item[8],item.join('\r')])
        }
    } else {
        dataFormat = dataFormat.filter(b => b.join(',').includes('交易成功') && b.join(',').includes(`支出`)&&!b.join(',').includes(`小荷包`));
        for (const item of dataFormat) {
            let key='';
            for (const js of configDefaultJson) {
                const matchStr= item.join(',');
                for (const val of js.value) {
                    if(val&&matchStr.includes(val)){
                        key=js.key;
                    }
                }
            }
            exportData.push([item[0], key||"其它", '支付宝', item[6], item[2]+'-'+item[3], item[9],item.join('\r')])
        }
    }
    console.log(dataFormat);
    return exportData;
}
async function load() {
    const allData=[];
    for (const file of filenames) {
        if (file.includes('.csv')) {
            let exportData = await new Promise(async (resolve, reject) => {
                const result = formatExcel(__dirname + "/" + file);
                resolve(result)
            });
            exportExcel.push(...exportData);
            allData.push(...exportData);
        }
    }
    // _.order(exportExcel,)
    console.log(exportExcel);
    let sheets = xlsx.parse('2024.xlsx');
    console.log(sheets);
    sheets[0].data=[];
    sheets=[sheets[0]]
    sheets.push({ name: '全年', data: exportExcel });
    const gp= _.groupBy(allData, function(data){
       return dayjs(data[0]).month()+1
    });

    const type=configDefaultJson.map(b=>b.key);

    for (const key in gp) {
        var bf=gp[key];
        const all=_.sum(gp[key].filter(c=>c[1]).map(c=>parseInt( +c[3].split('¥')[1]||+c[3].split('¥')[0])));
        sheets.push({ name: String(key)+'月', data: bf });
        sheets[0].data.push([String(key)+'月份','支出','占比'])
        for (const item of type) {
            const th=_.sum(gp[key].filter(c=>c[1]==item).map(c=>parseInt( +c[3].split('¥')[1]||+c[3].split('¥')[0])))
            sheets[0].data.push([item,th ,(th/all*100).toFixed(2)+'%'])
        }
        const oth=_.sum(gp[key].filter(c=>!type.includes(c[1])).map(c=>parseInt( +c[3].split('¥')[1]||+c[3].split('¥')[0])))
        sheets[0].data.push(['其它',oth,(oth/all*100).toFixed(2)+'%' ])
        sheets[0].data.push(['总数',all])
        sheets[0].data.push([])
        sheets[0].data.push([])
        sheets[0].data.push([])
    }

    var buffer = xlsx.build(sheets);
    fs.writeFile('./2024.xlsx', buffer, function (err) {
        console.log(err)
    });

}
load();