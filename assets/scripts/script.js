/*
    2. display function
*/

const generateNumbers = (num) => {
    const array = []
    for (let i = 0; i < num; ++i) {
        array.push(Math.floor(Math.random() * 100))
    }
    array.sort(function(a, b){return a - b});
    return array
}

const populateArray = () => {
    const array = generateNumbers(lenArray)
    for (let i = 0; i < array.length; ++i) {
        arrayObjects.item(i).getElementsByClassName('number')[0].textContent = array[i]
    }
    return array
}

const binarySearch = (array) => {
    const flow = []
    let start = 0, end = lenArray-1
    while(start <= end) {
        mid = Math.floor((start + end) / 2)
        flow.push({"start": start, "end": end, "mid": mid})
        if (array[mid] < target) start = mid + 1
        else if (array[mid] > target) end = mid - 1
        else return {"found": true, "flow": flow}
    }
    flow.push({"start": start, "end": end, "mid": null})
    return {"found": false, "flow": flow}
}

const clearFlow = () => {

    for (let i = 0; i < array.length; ++i) {
        arrayObjects.item(i).style.opacity = 1
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("found")
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("mid")
        arrayObjects.item(i).getElementsByClassName('start')[0].style.visibility = "hidden"
        arrayObjects.item(i).getElementsByClassName('end')[0].style.visibility = "hidden"
    }
}

const showFlow = () => {

    const start = result.flow[flowStep].start
    const end = result.flow[flowStep].end
    const mid = result.flow[flowStep].mid

    console.log(start, end, mid, flowStep);

    for (let i = 0; i < array.length; ++i) {

        arrayObjects.item(i).style.opacity = 1
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("found")
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("mid")
        arrayObjects.item(i).getElementsByClassName('start')[0].style.visibility = "hidden"
        arrayObjects.item(i).getElementsByClassName('end')[0].style.visibility = "hidden"

        if (i < start || i > end) {
            arrayObjects.item(i).style.opacity = 0.5
        }

        if (i === start) {
            arrayObjects.item(i).getElementsByClassName('start')[0].style.visibility = "visible"
        }
        if (i === end) {
            arrayObjects.item(i).getElementsByClassName('end')[0].style.visibility = "visible"
        }
        if (i === mid) {
            arrayObjects.item(i).getElementsByClassName('number')[0].classList.add("mid")
            if (array[mid] === target) {
                arrayObjects.item(i).getElementsByClassName('number')[0].classList.add("found")
            }
        }
    }
}

const showMessage = () => {
    return //! TODO after styling variable-space
}

const setupFlow = () => {
    flowStep = 0
    showFlow()
}

const forwardFlow = () => {
    if (flowStep < result.flow.length-1) {
        flowStep += 1
        showFlow()
        if (flowStep === result.flow.length-1) {
            showMessage()
        }
    }
}

const backwardFlow = () => {
    if (flowStep > 0) {
        flowStep -= 1
        showFlow()
    }
}

// Initialize variablse
let flowStep = 0
const lenArray = 9
let array = undefined
let target = undefined
let result = undefined

//  document queries
const numInput = document.getElementById("query")
const arrayObjects = document.getElementsByClassName("number-idx")
const resetArray = document.getElementById("reset-array")
const resetFlow = document.getElementById("reset-flow")

function main() {

    array = populateArray()

    numInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            target = Number(numInput.value)
            numInput.blur()
            result = binarySearch(array)
            setupFlow()
        }
    })

    document.addEventListener("keydown", function(event) {
        if (target !== undefined && numInput !== document.activeElement) {
            if (event.key === "ArrowLeft") {
                backwardFlow()
            } else if (event.key === "ArrowRight") {
                forwardFlow()
            }
        }
    })

    resetFlow.addEventListener("click", setupFlow)
    resetArray.addEventListener("click", function() {
        array = populateArray()
        numInput.value = ""
        target = undefined
        clearFlow()
    })


}

main()
