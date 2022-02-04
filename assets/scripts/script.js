
// functions
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
    flow.push({"start": start, "end": end, "mid": "-"})
    return {"found": false, "flow": flow}
}

const clearFlow = () => {

    startDisplay.textContent = ""
    endDisplay.textContent = ""
    midDisplay.textContent = ""

    for (let i = 0; i < array.length; ++i) {
        messageText.textContent = ""
        arrayObjects.item(i).style.opacity = 1
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("found-border")
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("mid")
        arrayObjects.item(i).getElementsByClassName('start')[0].style.visibility = "hidden"
        arrayObjects.item(i).getElementsByClassName('end')[0].style.visibility = "hidden"
    }
}

const showFlow = () => {

    const start = result.flow[flowStep].start
    const end = result.flow[flowStep].end
    const mid = result.flow[flowStep].mid

    startDisplay.textContent = start
    endDisplay.textContent = end
    midDisplay.textContent = mid
    midDisplayRow.classList.remove("found-color")

    for (let i = 0; i < array.length; ++i) {

        arrayObjects.item(i).style.opacity = 1
        arrayObjects.item(i).getElementsByClassName('number')[0].classList.remove("found-border")
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
                arrayObjects.item(i).getElementsByClassName('number')[0].classList.add("found-border")
            }
        }
    }

    if (flowStep === result.flow.length-1) {
        if (result.found) {
            messageText.textContent = "Found"
            midDisplayRow.classList.add("found-color")
        } else {
            messageText.textContent = "Not Found"
        }
    } else {
        messageText.textContent = ""
    }
}

const setupFlow = () => {
    flowStep = 0
    showFlow()
}

const forwardFlow = () => {
    if (flowStep < result.flow.length-1) {
        flowStep += 1
        showFlow()
    }
}

const backwardFlow = () => {
    if (flowStep > 0) {
        flowStep -= 1
        showFlow()
    }
}

const toggleInstructions = () => {
    
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
const messageText = document.getElementById("message-text")
const startDisplay = document.getElementById("start-display")
const endDisplay = document.getElementById("end-display")
const midDisplay = document.getElementById("mid-display")
const midDisplayRow = document.getElementById("mid-row")
const targetDisplay = document.getElementById("target-display")
const topBanner = document.getElementById("top-banner")
const stripe = document.getElementById("stripe")
const container = document.getElementById("container")
const infoButton = document.getElementById("infoButton")
const instructionPane = document.getElementById("instruction")

// main logic
function main() {

    const isMobile = () => window.matchMedia('(max-width: 700px)').matches
    if (isMobile()) {
        alert("Mobile")
    }

    array = populateArray()

    numInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            target = Number(numInput.value)
            targetDisplay.textContent = target
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
        targetDisplay.textContent = ""
        clearFlow()
    })

    const contentElements = [container, stripe, topBanner]

    infoButton.addEventListener("click", function() {
        if (container.style.pointerEvents === "none") {
            instructionPane.style.display = "none"
            contentElements.forEach((element) => {
                element.style.pointerEvents = "auto"
                element.style.opacity = 1
            })
        } else {
            instructionPane.style.display = "block"
            contentElements.forEach((element) => {
                element.style.pointerEvents = "none"
                element.style.opacity = 0.1
            })
        }
    })

}

main()
