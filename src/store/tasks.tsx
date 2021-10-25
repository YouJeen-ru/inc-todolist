// 1. Функция принимает параметром целые положительные числа и возвращает
// их сумму.

export const sum = (...numbers:number[]): number => {

    return numbers.reduce((acc, el) => acc + el)
}
// 2. Функция getTriangleType принимает три параметра:
// длины сторон треугольника.
// Функция должна возвращать:
//  - "01", если треугольник равнобедренный,
//  - "10", если треугольник равносторонний,
//  - "11", если треугольник обычный,
//  - "00", если такого треугольника не существует.


export const getTriangleType = (a:number,b:number,c:number): string => {
    if(a  + b > c && b + c > a && c + a > b) {
        if(a === b || b === c || c === a) {
            return '10'
        } else if (a === b && b === c ) {
            return '01'
        }
        else {
            return '11'
        }
    } else {
        return '00'
    }
}

// 3. Функция getSum принимает параметром целое число и возвращает
// сумму цифр этого числа

export function getSum(i: number): number {
    if (i === 0) return i


    const sum = i.toString().split('').map(Number)
    return sum.reduce((acc, el) => {
        return acc + el
    })
}


// 4. Функция принимает isEvenIndexSumGreater параметром массив чисел.
// Если сумма чисел с чётными ИНДЕКСАМИ!!! (0 как чётный индекс) больше
// суммы чисел с нечётными ИНДЕКСАМИ!!!, то функция возвращает true.
// В противном случае - false.

export const isEvenIndexSumGreater = (arrOfNumbers: Array<number>): boolean => {

    let even = 0
    let odd = 0
    for (let i = 0 ; i < arrOfNumbers.length;i++) {
        if (i % 2 === 0) {
            even += arrOfNumbers[i]
        } else {
            odd += arrOfNumbers[i]
        }
    }
    return even > odd
}


// 5. Функция isSquareGreater принимает два параметра: площадь круга и
// площадь квадрата. Функция должна возвращать true если круг не будет выступать за пределы
// квадрата и false в противном случае. Центры фигур совпадают.

export function isSquareGreater(circle: number, square: number): boolean {
    let circleArea = Math.PI * (circle*2)
    let squareArea = square ** 2
    return circleArea >= squareArea


}


// 6. Функция-банкомат принимает параметром целое натуральное число (сумму).
// Возвращает массив с наименьшим количеством купюр, которыми можно выдать эту
// сумму. Доступны банкноты следующих номиналов:
// const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1].
// Считаем, что количество банкнот каждого номинала не ограничено

export const getBanknoteList = (x:number) => {
    const banknotes = [1000, 500, 100, 50, 20, 10, 5, 2, 1]
    const resultBanknots:number[] = []
    if(x > 0) {
        for (let i = 0; i < banknotes.length; i++) {
            let note = banknotes[i]
            while (x - note >= 0 ) {
                x -= note
                resultBanknots.push(note)
            }
        }
    } else {
        console.log('')
    }
    return resultBanknots
}

