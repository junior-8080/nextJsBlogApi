const bcrypt = require('bcrypt');
const saltRound = 10;

function compare(obj1, obj2) {
    if (obj1.u_name !== obj2.u_name || obj1.Contact !== obj2.Contact || obj1.Email !== obj2.Email || obj1.Organization_Name !== obj2.Organization_Name) {
        return true
    }
    return false
}

function hashPassword(data) {
    return new Promise((resolve, reject) => {
        bcrypt.hash(data, saltRound).then(result => {
            if (result) {
                resolve(result)
            } else {
                reject('Failed')
            }
        })
        .catch(err => reject(err))
    })
}


function comparePassword(password, hash) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash).then(result => {
              resolve(result)
        })
        // .catch(err => console.log(err))
    })
}

const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const quaters = ['Q1','Q2','Q3','Q4']
// let arr = [];
function month(indexes,split,newObj){
    let arr = [];
    indexes.forEach(item => {
        arr.push({name:item,...newObj[item]})
    })
    return arr
}


function oneMonth(indexes,split,newObj){
    let arr = []
   
    months.forEach((item,i )=> {
        if(indexes.includes(item)){
            arr.push({name:item,...newObj[item]})
        }
        else{
            arr.push({name:item,[split[0]]:null})
        }
    })
    console.log(arr)
    return arr;

}

function quater(indexes,split,newObj){
    let arr = []
    // console.log('hooo')
    // indexes.forEach((item,i) => {
    //     const ke = Object.keys(item)
    //     const result = split.filter(word => !ke.includes(word));
    //     console.log(result.length)
    //     for(let ie=0;ie < result.length; ie++){
    //         if(result.length > 0 && !newObj[quaters[i]][result[ie]]){
    //             newObj[quaters[i]][result[ie]] = null
    //         } 
    //     }
    //     arr.push({name:quaters[i],...newObj[quaters[i]]})
    // })
    
    indexes.forEach(item => {
        arr.push({name:item,...newObj[item]})
    })
    return arr;
}

function oneQuater(indexes,split,newObj){
   
   let  arr = []
    quaters.forEach((item,i )=> {
        if(indexes.includes(item)){
            arr.push({name:item,...newObj[item]})
        }
        else{
            arr.push({name:item,[split[0]]:null})
        }
    })
    console.log(arr)
    return arr;
}

function week(indexes,split,newObj){
    let arr = [];
    indexes.forEach(item => {
        arr.push({name:item,...newObj[item]})
    })
    return arr
}
// create dictionary for acctype.
function createObjectAccType (result,split){
    const newObj = {};
    console.log(result);
    result.map((item,index) => {
        // delete item.year;
        const month = split.length > 1 ? months[parseInt(item.month -1)] +'-' + item.year :months[parseInt(item.month -1)] 
        const test = Object.keys(newObj).includes(month);
        if (test) { 

            if(item.subscription_type === 'basic'){
                return newObj[month]['Standard'] = parseInt(item.value);
            }else{
                return newObj[month]['Enterprise'] = parseInt(item.value);
            }
          
        }
        if(!newObj[month]) newObj[month] = {};
         if(item.subscription_type === 'basic'){
                return newObj[month]['Standard'] = parseInt(item.value);
            }else{
                return newObj[month]['Enterprise'] = parseInt(item.value);
        }
    })
    return newObj

}
function createObjectMonth(result,split){
    const newObj = {};
    result.map((item,index) => {
        const month = split.length > 1 ? months[parseInt(item.month -1)] +'-' + item.year :months[parseInt(item.month -1)] 
        const test = Object.keys(newObj).includes(month);
        if (test) { 
            return newObj[month]['value']= parseInt(item.value)
        }
        if(!newObj[month]) newObj[month] = {};
        newObj[month]['value'] = parseInt(item.value)
    })
    console.log(newObj)
    return newObj
}

function quaterObjectAccType(result,split){
    const newObj = {};
    console.log(result)
    result.map((item,index) => {
     
        const quarter = split.length > 1 ? 'Q' + item.quarter +'-' + item.year :  'Q' + item.quarter  ;
        const test = Object.keys(newObj).includes(quarter);
        delete item.year;
        if (test) { 

            if(item.subscription_type === 'basic'){
                return newObj[quarter]['Standard'] = parseInt(item.value);
            }else{
                return newObj[quarter]['Enterprise'] = parseInt(item.value);
            }
          
        }
        if(!newObj[quarter]) newObj[quarter] = {};
         if(item.subscription_type === 'basic'){
                return newObj[quarter]['Standard'] = parseInt(item.value);
            }else{
                return newObj[quarter]['Enterprise'] = parseInt(item.value);
        }

    })
    return newObj;
}

function quaterObjectYear(result,split){
    console.log(split)
    const newObj = {};
    result.map((item,index) => {
    
        const quarter = split.length > 1 ?  'Q' + item.quarter +'-' + item.year : 'Q' +  item.quarter ;
        const test = Object.keys(newObj).includes(quarter);
        if (test) { 
            return newObj[quarter][item.year] = parseInt(item.value)
        }
        if(!test) newObj[quarter] = {};
        newObj[quarter]['value']= parseInt(item.value)

    })

    return newObj;
}

function createObjectYear(result){
    const newObj = {};
    result.map((item,index) => {
        const year = item.name;
        console.log(year)
        const test = Object.keys(newObj).includes(year.toString());
        if (test) { 

            if(item.subscription_type === 'basic'){
                 newObj[year]['Standard'] = parseInt(item.value);
            }else{
                 newObj[year]['Enterprise'] = parseInt(item.value);
            }
          
        }
        if(!test) newObj[year] = {};
         if(item.subscription_type === 'basic'){
                return newObj[year]['Standard'] = parseInt(item.value);
            }else{
                 newObj[year]['Enterprise'] = parseInt(item.value);
            }

        
    })
   
    return newObj

}

function weekObjectAccType(result,split){
    const newObj = {};
    console.log(result)
    result.map((item,index) => {
     
        const week =  'W' + item.week;
        const test = Object.keys(newObj).includes(week);
        delete item.year;
        if (test) { 

            if(item.subscription_type === 'basic'){
                return newObj[week]['Standard'] = parseInt(item.value);
            }else{
                return newObj[week]['Enterprise'] = parseInt(item.value);
            }
          
        }
        if(!newObj[week]) newObj[week] = {};
         if(item.subscription_type === 'basic'){
                return newObj[week]['Standard'] = parseInt(item.value);
            }else{
                return newObj[week]['Enterprise'] = parseInt(item.value);
        }

    })
    return newObj;
}


module.exports = {
    hashPassword,
    comparePassword,
    compare,
    month,
    oneMonth,
    quater,
    oneQuater,
    week,
    createObjectAccType,
    createObjectMonth,
    quaterObjectAccType,
    quaterObjectYear,
    createObjectYear,
    weekObjectAccType
}
