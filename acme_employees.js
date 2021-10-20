const employees = [
    { id: 1, name: 'moe'},
    { id: 2, name: 'larry', managerId: 1},
    { id: 4, name: 'shep', managerId: 2},
    { id: 3, name: 'curly', managerId: 1},
    { id: 5, name: 'groucho', managerId: 3},
    { id: 6, name: 'harpo', managerId: 5},
    { id: 8, name: 'shep Jr.', managerId: 4},
    { id: 99, name: 'lucy', managerId: 1}
];
  
const spacer = (text)=> {
    if(!text){
      return console.log('');
    }
    const stars = new Array(5).fill('*').join('');
    console.log(`${stars} ${text} ${stars}`);
}
  
spacer('findEmployeeByName Moe')
  // given a name and array of employees, return employee
console.log(findEmployeeByName('moe', employees));//{ id: 1, name: 'moe' }
spacer('')

function findEmployeeByName(name, arr){
    let employee_search = {}
    arr.forEach(function(employee){
        if(employee.name===name){
          employee_search = employee
        }
    })
    return employee_search;
}

function findManagerByNumber(num, arr){
    let manager_search = {}
    arr.forEach(function(manager){
        if(manager.id===num){
            manager_search = manager
        }
    })
    return manager_search;
}

spacer('findManagerFor Shep Jr.')
//given an employee and a list of employees, return the employee who is the manager
console.log(findManagerFor(findEmployeeByName('shep Jr.', employees), employees));//{ id: 4, name: 'shep', managerId: 2 }
spacer('')

function findManagerFor(name, arr){
    let value = findEmployeeByName(name.name, arr)
    let manager_num = value.managerId
    return findManagerByNumber(manager_num, arr)
}

spacer('findCoworkersFor Larry')
//given an employee and a list of employees, return the employees who report to the same manager
console.log(findCoworkersFor(findEmployeeByName('larry', employees), employees));
spacer('');

function findCoworkersFor(employee, arr){
    let friends_array = []
    let manager_num = employee.managerId
    arr.forEach(function(friends){
        if(friends.managerId === manager_num){
            friends_array.push(friends)
        }
    
    })
    return friends_array
}

spacer('findManagementChain for moe')
//given an employee and a list of employees, return a the management chain for that employee. The management chain starts from the employee with no manager with the passed in employees manager 
console.log(findManagementChainForEmployee(findEmployeeByName('moe', employees), employees));//[  ]
spacer('');

spacer('findManagementChain for shep Jr.')
console.log(findManagementChainForEmployee(findEmployeeByName('shep Jr.', employees), employees));/*
[ { id: 1, name: 'moe' },
  { id: 2, name: 'larry', managerId: 1 },
  { id: 4, name: 'shep', managerId: 2 }]
*/
spacer('');

function findManagementChainForEmployee(employee, arr){
    let management_arr = []
    while(employee.managerId){
        employee = findManagerFor(employee, arr)
        management_arr.push(employee)
    }
    return management_arr
}

spacer('generateManagementTree')
//given a list of employees, generate a tree like structure for the employees, starting with the employee who has no manager. Each employee will have a reports property which is an array of the employees who report directly to them.
console.log(JSON.stringify(generateManagementTree(employees), null, 2));
spacer('');

function generateManagementTree(arr){
    const manager = arr.find(emp => !emp.managerId)
    return {...manager, employees_under: tree(manager, arr)}
}
function tree(manager, arr){
    let filter = []
    arr.forEach(function(employee){
        if(employee.managerId === manager.id){
            filter.push(employee)
        }
    })
    return filter.reduce(function(acc, employee){
        acc.push({
            ...employee, employees_under: tree(employee, employees)});
            return acc
    }, [])
}



spacer('displayManagementTree')
//given a tree of employees, generate a display which displays the hierarchy
displayManagementTree(generateManagementTree(employees));
spacer('');

function displayManagementTree(arr){
    const tree = generateManagementTree
    let preface = ''
    tree.forEach(function(branch){
        return preface + branch
        preface += '-'
    })
}
