"use strict";

/**
 * Initializes labels and datasets
 */
function chartInitialization()
{
    let netUpRectangle = document.getElementById("net-rectangle-up");
    let netDownRectangle = document.getElementById("net-rectangle-down");
    let processorRectangle = document.getElementById("processor-rectangle");
    let ramRectangle = document.getElementById("ram-rectangle");
    let storageRectangle = document.getElementById("storage-rectangle");

    let ctx = document.getElementById("chart-body").getContext("2d");

    netUpTriangle = document.getElementById("net-triangle-up");
    netDownTriangle = document.getElementById("net-triangle-down");
    processorTriangle = document.getElementById("processor-triangle");
    ramTriangle = document.getElementById("ram-triangle");
    storageTriangle = document.getElementById("storage-triangle");

    let dataLight =
    {
        data:
        {
            labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            datasets:
            [
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(89, 101, 249, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(230, 232, 254, 1)",
                    backgroundColor: "rgba(230, 232, 254, 0.3)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(255, 89, 89, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(249, 226, 226, 1)",
                    backgroundColor: "rgba(249, 226, 226, 0.3)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(8, 193, 141, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(212, 242, 225, 1)",
                    backgroundColor: "rgba(212, 242, 225, 0.3)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(129, 199, 212, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(129, 199, 212, 0.5)",
                    backgroundColor: "rgba(129, 199, 212, 0.3)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(180, 129, 187, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(180, 129, 187, 0.5)",
                    backgroundColor: "rgba(180, 129, 187, 0.3)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
    }
    let dataDark =
    {
        data:
        {
            labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
            datasets:
            [
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(188, 188, 188, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(121, 121, 121, 1)",
                    backgroundColor: "rgba(121, 121, 121, 0.5)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(188, 188, 188, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(121, 121, 121, 1)",
                    backgroundColor: "rgba(121, 121, 121, 0.5)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                },
                {
                    borderWidth: 1.5,
                    borderColor: "rgba(188, 188, 188, 1)",
                    pointRadius: 2,
                    pointHoverRadius: 3,
                    pointBackgroundColor: "rgba(255, 255, 255, 1)",
                    pointHoverBackgroundColor: "rgba(121, 121, 121, 1)",
                    backgroundColor: "rgba(121, 121, 121, 0.5)",
                    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                }
            ]
        }
    }
    let options =
    {
        type: "line",
        options:
        {
            maintainAspectRatio: false,
            legend:
            {
                display: false
            },
            elements:
            {
                line:
                {
                    tension: 0
                }
            },
            scales:
            {
                yAxes:
                [
                    {
                        ticks:
                        {
                            display: false,
                            suggestedMin: 0,
                            suggestedMax: 100
                        },
                        gridLines:
                        {
                            drawTicks: false
                        }
                    }
                ],
                xAxes:
                [
                    {
                        ticks:
                        {
                            display: false
                        },
                        gridLines:
                        {
                            drawTicks: false
                        }
                    }
                ]
            },
            animation:
            {
                duration: 150
            }
        }
    };

    chart = new Chart(ctx, Object.assign((html.getAttribute("theme") == "light") ? dataLight : dataDark, options));

    processorRectangle.addEventListener("click", function(event) {hideDataset(event.target || event.srcElement)});
    ramRectangle.addEventListener("click", function(event) {hideDataset(event.target || event.srcElement)});
    storageRectangle.addEventListener("click", function(event) {hideDataset(event.target || event.srcElement)});
    netUpRectangle.addEventListener("click", function(event) {hideDataset(event.target || event.srcElement)});
    netDownRectangle.addEventListener("click", function(event) {hideDataset(event.target || event.srcElement)});
}

const upDataset = [], downDataset = [];
/**
 * Updates datasets shifting previous values
 *
 * @param {*} datasets datasets to update
 * @param {*} usageData new data
 */
function chartTick(usageData)
{
    let datasets = chart.data.datasets;

    console.log(datasets);

    for (let i = 0; i < datasets.length; i++)
    {
        let dataset = datasets[i].data;
        let usageDataArray = Object.values(usageData);

        if(i == 3 || i == 4) {
            if(i == 3) {
                upDataset.push(usageDataArray[i]);
                if(upDataset.length > 40) {
                    upDataset.shift();
                }
                while (upDataset.length < 40) {
                    upDataset.unshift(0);
                }
                const netMax = Math.max(...upDataset.concat(downDataset));
                for(let j = 20; j < upDataset.length; j++) {
                    dataset[j - 20] = (upDataset[j] / netMax) * 100;
                }
                continue;
            }
            if(i == 4) {
                downDataset.push(usageDataArray[i]);
                if(downDataset.length > 40) {
                    downDataset.shift();
                }
                while (downDataset.length < 40) {
                    downDataset.unshift(0);
                }
                const netMax = Math.max(...upDataset.concat(downDataset));
                for(let j = 20; j < downDataset.length; j++) {
                    dataset[j - 20] = (downDataset[j] / netMax) * 100;
                }
                continue;
            }
        }

        for (let k = 0; k < dataset.length - 1; k++)
        {
            dataset[k] = dataset[k + 1];
        }
        dataset[dataset.length - 1] = usageDataArray[i];
    }

    chart.update();
}

/**
 * Hides chosen dataset from chart
 *
 * @param {*} element dataset to hide
 */
function hideDataset(element)
{
    switch (String(element.id))
    {
        case "processor-rectangle":
        {
            processorTriangle.style.animation = (chart.getDatasetMeta(0).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(0).hidden = (chart.getDatasetMeta(0).hidden) ? false : true;
            break;
        }
        case "ram-rectangle":
        {
            ramTriangle.style.animation = (chart.getDatasetMeta(1).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(1).hidden = (chart.getDatasetMeta(1).hidden) ? false : true;
            break;
        }
        case "storage-rectangle":
        {
            storageTriangle.style.animation = (chart.getDatasetMeta(2).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(2).hidden = (chart.getDatasetMeta(2).hidden) ? false : true;
            break;
        }
        case "net-rectangle-up":
        {
            netUpTriangle.style.animation = (chart.getDatasetMeta(3).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(3).hidden = (chart.getDatasetMeta(3).hidden) ? false : true;
            break;
        }
        case "net-rectangle-down":
        {
            netDownTriangle.style.animation = (chart.getDatasetMeta(4).hidden) ? "fade-in-triangle 0.5s forwards" : "fade-out-triangle 0.5s forwards";

            chart.getDatasetMeta(4).hidden = (chart.getDatasetMeta(4).hidden) ? false : true;
            break;
        }
    }

    chart.update();
}