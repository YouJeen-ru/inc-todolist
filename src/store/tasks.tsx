export type ActionType = {
    type: 'sum' | 'mult' | 'div' | 'sub'
    number?: number
}

export function salaryReducer(salary: number, action: ActionType) {
    switch (action.type) {
        case 'sum': {
            return salary + action.number!
        }
        case "mult": {
            return salary * action.number!
        }
        case "div": {
            return salary / action.number!
        }
        case "sub": {
            return salary - action.number!
        }
        default: {
            return salary
        }
    }

}