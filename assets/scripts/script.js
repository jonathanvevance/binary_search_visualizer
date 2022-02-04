
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
            arrayObjects.item(i).style.opacity = numberReducedOpacity
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

const isMobile = () => {
  const vendor = navigator.userAgent || navigator.vendor || window.opera;

  return !!(
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
      vendor
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      vendor.substr(0, 4)
    )
  );
};

// Initialize variablse
let flowStep = 0
let array = undefined
let target = undefined
let result = undefined

const lenArray = 9
const numberReducedOpacity = 0.5
const contentReducedOpacity = 0.2

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

    if (isMobile()) {
        alert("THIS WEBSITE IS NOT DESIGNED FOR MOBILE BROWSER EXPERIENCE. PLEASE CONSIDER SWITCHING TO A DESKTOP OR A LAPTOP")
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
                element.style.opacity = contentReducedOpacity
            })
        }
    })

}

main()
