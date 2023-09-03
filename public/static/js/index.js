"use strict";

/**
 * Initializes uptime, labels and chart values
 */

let inList = false;

function indexInitialization(isList = false)
{

    if(isList) {
        inList = true;
    }

    logoPage = document.getElementById("logo-page");
    contactsPage = document.getElementById("contacts-page");

    showCards();

    currentClockSpeed = document.getElementById("currentClockSpeed");
    currentProcCount = document.getElementById("currentProcCount");
    currentTotalStorage = document.getElementById("currentTotalStorage");
    currentDiskCount = document.getElementById("currentDiskCount");

    currentPage = 1;
    firstControl = document.getElementById("first-control");
    secondControl = document.getElementById("second-control");

    cloudLeft = document.getElementById("cloud-left");
    cloudRight = document.getElementById("cloud-right");

    days = document.getElementById("uptime-days");
    hours = document.getElementById("uptime-hours");
    minutes = document.getElementById("uptime-minutes");
    seconds = document.getElementById("uptime-seconds");

    usageXHR = new XMLHttpRequest();
    infoXHR = new XMLHttpRequest();

    const URLParams = new URLSearchParams(window.location.search);
    const id = URLParams.get('id');

    fetchBackend(id);

    firstControl.addEventListener("click", function(event) {changePage(event.target || event.srcElement)});
    secondControl.addEventListener("click", function(event) {changePage(event.target || event.srcElement)});
}

function useWebSocket(channel) {
    return new Promise((resolve, reject) => {
        const socket = new WebSocket((location.protocol === 'http:' ? 'ws://' : 'wss://') + location.host + '/api/socket?channel=' + encodeURIComponent(channel));
        socket.onopen = () => {
            setInterval(() => {
                socket.send(JSON.stringify({
                    event: 'ping'
                }));
            }, 3000);
            resolve(socket);
        };
        socket.onerror = (e) => {
            reject(e);
        };
    });
}

function setWebSocket(id) {
    const socket = useWebSocket('status:' + id).then(socket => {
        socket.onmessage = (e) => {
            const data = JSON.parse(e.data);
            if(data.event === 'update') {
                const { usage, info } = data.data;
                sendInfoRequest(info);
                sendUsageRequest(usage);
            }
        };
        socket.onclose = () => {
            setWebSocket(id);
        }
    }, () => {
        setTimeout(() => {
            setWebSocket(id);
        }, 1000);
    });
}

function fetchBackend(id) {
    fetch(`/api/backend/${id}`).then(res => {
        if(res.ok) return res.json();
    }).then(res => {
        const { name, usage, info } = res;
        window.document.title = name + ' - Lian Ward';
        $('.hw-name').eq(0).html(info.processor.name);
        $('.hw-name').eq(1).html(info.machine.operatingSystem);
        $('.hw-name').eq(2).html(info.storage.mainStorage);
        $('.detailed-hw-info .first').eq(0).html(info.processor.coreCount);
        $('.detailed-hw-info .third').eq(0).html(info.processor.bitDepth);
        $('.detailed-hw-info .first').eq(1).html(info.machine.totalRam);
        $('.detailed-hw-info .second').eq(1).html(info.machine.ramTypeOrOSBitDepth);
        $('.detailed-hw-info .third').eq(2).html(info.storage.swapAmount);
        $('#logo-description-name').html(('NODE-' + id).toLocaleUpperCase());
        sendInfoRequest(info);
        sendUsageRequest(usage);
        setWebSocket(id);
    });
}

/**
 * Changes cards opacity with random sequence
 */
function showCards()
{
    contactsPage.style.visibility = "hidden";

    let cards = document.getElementsByClassName("card");
    let versionLabel = document.getElementById("project-version");

    let randomSequenceArray = getRandomSequenceArray();

    for (let i = 0; i < cards.length; i++)
    {
        setTimeout(function()
        {
            cards[randomSequenceArray[i]].style.opacity = "1";

            if (randomSequenceArray[i] == 4)
            {
                versionLabel.style.opacity = "1";
            }
        }, 70 * i);
    }
}

/**
 * Generates random sequence
 */
function getRandomSequenceArray()
{
    let buffer = [];

    while (buffer.length < 5)
    {
        let randomNumber = Math.floor(Math.random() * 5);

        if ((buffer.indexOf(randomNumber) === -1))
        {
            buffer.push(randomNumber);
        }
    }

    return buffer;
}

/**
 * Sending ajax request to receive usage info
 */
function sendUsageRequest(response)
{
    labelsTick(response);
    chartTick(response);
}

/**
 * Sending ajax request to receive info about server
 */
function sendInfoRequest(response)
{
    currentClockSpeed.innerHTML = response.processor.clockSpeed;
    currentProcCount.innerHTML = response.machine.procCount;
    currentTotalStorage.innerHTML = response.storage.total;
    currentDiskCount.innerHTML = response.storage.diskCount;

    days.innerHTML = response.uptime.days;
    hours.innerHTML = response.uptime.hours;
    minutes.innerHTML = response.uptime.minutes;
    seconds.innerHTML = response.uptime.seconds;
}

/**
 * Changes page
 *
 * @param {*} control element
 */
function changePage(element)
{
    if ((String(element.id) == "first-control") && (currentPage > 1))
    {
        currentPage -= 1;
        setCloudAnimation(currentPage);
    }
    else if ((String(element.id) == "second-control") && (currentPage < 2))
    {
        currentPage += 1;
        setCloudAnimation(currentPage);
    }

    setPageVisibility(currentPage);
    setControlOpacity(currentPage);
}

/**
 * Changes page visibility
 *
 * @param {*} new page
 */
function setPageVisibility(newPage)
{
    switch (newPage)
    {
        case 1:
        {
            logoPage.style.visibility = "";
            contactsPage.style.visibility = "hidden";
            break;
        }
        case 2:
        {
            logoPage.style.visibility = "hidden";
            contactsPage.style.visibility = "";
            break;
        }
    }
}

/**
 * Animates clouds
 *
 * @param {*} new page
 */
function setCloudAnimation(newSquareScale)
{
    switch (newSquareScale)
    {
        case 1:
        {
            cloudLeft.style.animation = "fade-in-cloud-left 0.3s forwards";
            cloudRight.style.animation = "fade-in-cloud-right 0.3s forwards";
            break;
        }
        case 2:
        {
            cloudLeft.style.animation = "fade-out-cloud-left 0.3s forwards";
            cloudRight.style.animation = "fade-out-cloud-right 0.3s forwards";
            break;
        }
    }
}

/**
 * Changes opacity of control
 *
 * @param {*} new page
 */
function setControlOpacity(newSquareScale)
{
    switch (newSquareScale)
    {
        case 1:
        {
            firstControl.style.opacity = "0.5";
            secondControl.style.opacity = "1";
            break;
        }
        case 2:
        {
            firstControl.style.opacity = "1";
            secondControl.style.opacity = "0.5";
            break;
        }
    }
}