import area from './area.js'
import fs from 'fs'

const areaCodeName = 'value' // 输出的地区编码键名
const areaCodeLabel = 'name' // 输出的地区名称键名
const subName = 'children' // 输出的子级键名

let list = []

for (let [provinceKey, provinceValue] of Object.entries(area.province_list)) {
  let provinceChildren = []
  for (let [cityKey, cityValue] of Object.entries(area.city_list)) {
    let cityChildren = []
    if (provinceKey.slice(0, 2) === cityKey.slice(0, 2)) {
      for (let [countyKey, countyValue] of Object.entries(area.county_list)) {
        if (cityKey.slice(0, 4) === countyKey.slice(0, 4)) {
          cityChildren.push({
            [areaCodeName]: countyKey,
            [areaCodeLabel]: countyValue,
          })
        }
      }
      provinceChildren.push({
        [areaCodeName]: cityKey,
        [areaCodeLabel]: cityValue,
        [subName]: cityChildren,
      })
    }
  }
  list.push({
    [areaCodeName]: provinceKey,
    [areaCodeLabel]: provinceValue,
    [subName]: provinceChildren,
  })
}
let json = JSON.stringify(list)
fs.writeFile('areaData.json', json, 'utf8', () => {
  console.log('转换成功')
})
