
if(module && module.hot) {
    module.hot.accept()
}
import './index.less'
class Animal {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
}

const dog = new Animal('dog');

// 使用lodash深拷贝cloneDeep
const obj1 = {
    subObj: {
        a: 123
    }
};
const obj2 = _.cloneDeep(obj1);
obj1.b = 'test';
console.log(obj1, obj2)

document.getElementById('btn').onclick = () => {
    import('./handle').then(fn => {
        console.log(fn.default)
        return fn.default;
    })
};

fetch('/user')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

fetch('/login/account', {
    method: 'POST',
    headers: {
        'Accept': 'application/josn',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        username: 'admin',
        password: 'admin'
    })
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.log(err))

if (FLAG) {
    console.log('1111')
}