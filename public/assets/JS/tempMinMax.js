export function getMax(arr, attr){
    return Math.max.apply(Math, arr.map(item => item.main[attr]));
  }
  
  export function getMin(arr, attr){
    return Math.min.apply(Math, arr.map(item => item.main[attr]));
  }