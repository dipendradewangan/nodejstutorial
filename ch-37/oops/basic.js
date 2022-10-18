// normal class and object

// class wap{
//     demo(){
//         console.log("dipendra kumar dewangan");
//     }
// };


// const wapObject = new wap();
// wapObject.demo();


// constructor class and object

class wap{
    x = "dipendra kumar dewangan"
    constructor(){
        console.log("this is constructor");
        console.log(this.x);
    }
    
    demo(){
        console.log("This is demo");
        console.log(this.x);
    }
}

const obj = new wap();

obj.demo();