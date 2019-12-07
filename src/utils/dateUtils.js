function formateDate (time){
    if(!time){
        return ''
    }
    let date = new Date(time);
    return date.getFullYear() + 
    "-" + add0( date.getMonth() + 1 ) + 
    "-" + add0( date.getDate() )+ 
    " " + add0( date.getHours() ) +
    ":" + add0( date.getMinutes() ) + 
    ":" + add0( date.getSeconds() )
}

function add0(n){
    return n < 10 ? "0" + n : n
}

export { formateDate }    // 导出