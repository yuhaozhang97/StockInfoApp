const text = document.getElementById('text')
const searchButton = document.getElementById('search')
const clearButton = document.getElementById('clear')
const form = document.getElementById('base-form')
const error = document.getElementById('error')
const nav = document.getElementById('nav')
const content = document.getElementById('content')
const company = document.getElementById('company')
const stock = document.getElementById('stock')
const charts = document.getElementById('charts')
const news = document.getElementById('news')

// const baseURL = 'http://127.0.0.1:5000'
const baseURL = 'http://csci571hw5.us-east-1.elasticbeanstalk.com/'

form.onsubmit = (e) => {
	e.preventDefault()
}

clearButton.onclick = (e) => {
	e.preventDefault()
	text.value = ''
	nav.style.display = 'none'
	content.style.display = 'none'
	error.style.display = 'none'
}

const companyFunc = () => {
	if (text.value) {
		let req = new XMLHttpRequest()
		let url = `${baseURL}/search?keyword=${text.value}`

		req.open('GET', url)

		req.send()

		req.onload = () => {
			if (req.status === 200) {
				const data = JSON.parse(req.response)

				if (data.detail === 'Not found.') {
					error.style.display = 'block'
				} else {
					error.style.display = 'none'
					nav.style.display = 'block'
					content.style.display = 'block'

					company.focus()

					content.innerHTML =
						'<table class="company-table">' +
						'<tr>' +
						'<th class="column-1">Company Name</th>' +
						'<th class="column-2">' +
						data.name +
						'</th>' +
						'</tr>' +
						'<tr>' +
						'<th class="column-1">Stock Ticker Symbol</th>' +
						'<th class="column-2">' +
						data.ticker +
						'</th>' +
						'</tr>' +
						'<tr>' +
						'<th class="column-1">Stock Exchange Code</th>' +
						'<th class="column-2">' +
						data.exchangeCode +
						'</th>' +
						'</tr>' +
						'<tr>' +
						'<th class="column-1">Company Start Date</th>' +
						'<th class="column-2">' +
						data.startDate +
						'</th>' +
						'</tr>' +
						'<tr>' +
						'<th class="column-1">Description</th>' +
						'<th class="column-2 description-cell">' +
						data.description +
						'</th>' +
						'</tr>' +
						'</table>'
				}
			} else {
				console.log(`error ${req.status} ${req.statusText}`)
			}
		}
	}
}

searchButton.onclick = () => {
	content.innerHTML = ''
	nav.style.display = 'none'
	companyFunc()
}

company.onclick = companyFunc

stock.onclick = () => {
	if (text.value) {
		let req = new XMLHttpRequest()
		let url = `${baseURL}/stock?keyword=${text.value}`

		req.open('GET', url)

		req.send()

		req.onload = () => {
			if (req.status === 200) {
				const data = JSON.parse(req.response)[0]

				if (data.detail === 'Not found.') {
					error.style.display = 'block'
				} else {
					error.style.display = 'none'

					stock.focus()

					const change = data.last - data.prevClose
					const changePercent = (change / data.prevClose) * 100

					if (change < 0) {
						content.innerHTML =
							'<table class="company-table">' +
							'<tr>' +
							'<th class="column-1">Stock Ticker Symbol</th>' +
							'<th class="column-2">' +
							data.ticker +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Trading Day</th>' +
							'<th class="column-2">' +
							data.timestamp.slice(0, 10) +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Previous Closing Price</th>' +
							'<th class="column-2">' +
							data.prevClose +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Opening Price</th>' +
							'<th class="column-2">' +
							data.open +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">High Price</th>' +
							'<th class="column-2">' +
							data.high +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Low Price</th>' +
							'<th class="column-2">' +
							data.low +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Last Price</th>' +
							'<th class="column-2">' +
							data.last +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change</th>' +
							'<th class="column-2">' +
							change.toFixed(2) +
							'<img class="arrow" src="static/image/RedArrowDown.jpg"/>' +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change Percent</th>' +
							'<th class="column-2">' +
							changePercent.toFixed(2) +
							'%' +
							'<img class="arrow" src="static/image/RedArrowDown.jpg"/>' +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Number of Shares Traded</th>' +
							'<th class="column-2">' +
							data.volume +
							'</th>' +
							'</tr>' +
							'</table>'
					} else if (change > 0) {
						content.innerHTML =
							'<table class="company-table">' +
							'<tr>' +
							'<th class="column-1">Stock Ticker Symbol</th>' +
							'<th class="column-2">' +
							data.ticker +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Trading Day</th>' +
							'<th class="column-2">' +
							data.timestamp.slice(0, 10) +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Previous Closing Price</th>' +
							'<th class="column-2">' +
							data.prevClose +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Opening Price</th>' +
							'<th class="column-2">' +
							data.open +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">High Price</th>' +
							'<th class="column-2">' +
							data.high +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Low Price</th>' +
							'<th class="column-2">' +
							data.low +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Last Price</th>' +
							'<th class="column-2">' +
							data.last +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change</th>' +
							'<th class="column-2">+' +
							change.toFixed(2) +
							'<img class="arrow" src="static/image/GreenArrowUp.jpg"/>' +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change Percent</th>' +
							'<th class="column-2">+' +
							changePercent.toFixed(2) +
							'%' +
							'<img class="arrow" src="static/image/GreenArrowUp.jpg"/>' +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Number of Shares Traded</th>' +
							'<th class="column-2">' +
							data.volume +
							'</th>' +
							'</tr>' +
							'</table>'
					} else {
						content.innerHTML =
							'<table class="company-table">' +
							'<tr>' +
							'<th class="column-1">Stock Ticker Symbol</th>' +
							'<th class="column-2">' +
							data.ticker +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Trading Day</th>' +
							'<th class="column-2">' +
							data.timestamp.slice(0, 10) +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Previous Closing Price</th>' +
							'<th class="column-2">' +
							data.prevClose +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Opening Price</th>' +
							'<th class="column-2">' +
							data.open +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">High Price</th>' +
							'<th class="column-2">' +
							data.high +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Low Price</th>' +
							'<th class="column-2">' +
							data.low +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Last Price</th>' +
							'<th class="column-2">' +
							data.last +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change</th>' +
							'<th class="column-2">' +
							change.toFixed(2) +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Change Percent</th>' +
							'<th class="column-2">' +
							changePercent.toFixed(2) +
							'%' +
							'</th>' +
							'</tr>' +
							'<tr>' +
							'<th class="column-1">Number of Shares Traded</th>' +
							'<th class="column-2">' +
							data.volume +
							'</th>' +
							'</tr>' +
							'</table>'
					}
				}
			} else {
				console.log(`error ${req.status} ${req.statusText}`)
			}
		}
	}
}

charts.onclick = () => {
	if (text.value) {
		let req = new XMLHttpRequest()
		let url = `${baseURL}/charts-data?keyword=${text.value}`

		req.open('GET', url)

		req.send()

		req.onload = () => {
			if (req.status === 200) {
				const data = JSON.parse(req.response)
				console.log('hi', data)

				if (data.length === 0) {
					alert('No data point found.')
				} else {
					error.style.display = 'none'
					nav.style.display = 'block'
					content.style.display = 'block'

					charts.focus()
					content.innerHTML = ''

					// Today's date
					const today = new Date()
					var dd = String(today.getDate()).padStart(2, '0')
					var mm = String(today.getMonth() + 1).padStart(2, '0')
					var yyyy = today.getFullYear()

					// Preprocess data
					let prices = []
					let volumes = []

					data.map((entry) => {
						const year = parseInt(entry.date.slice(0, 4))
						const month = parseInt(entry.date.slice(5, 7))
						const day = parseInt(entry.date.slice(8, 10))
						const date = Date.UTC(year, month - 1, day)

						prices.push([date, entry.close])
						volumes.push([date, entry.volume])
					})

					console.log(prices)

					// Create chart
					Highcharts.stockChart('content', {
						title: {
							text: `Stock Price ${text.value.toUpperCase()} ${yyyy}-${mm}-${dd}`,
							margin: 39
						},
						subtitle: {
							useHTML: true,
							y: 45,
							text:
								'<a target="_blank" rel="noopener noreferrer" href="https://api.tiingo.com/"><u>Source: Tiingo</u></a>'
						},
						xAxis: {
							gapGridLineWidth: 0,
							type: 'datetime'
						},
						rangeSelector: {
							buttons: [
								{
									type: 'day',
									count: 7,
									text: '7d'
								},
								{
									type: 'day',
									count: 15,
									text: '15d'
								},
								{
									type: 'month',
									count: 1,
									text: '1m'
								},
								{
									type: 'month',
									count: 3,
									text: '3m'
								},
								{
									type: 'month',
									count: 6,
									text: '6m'
								}
							],
							selected: 4,
							inputEnabled: false
						},
						yAxis: [
							{
								// Primary yAxis
								gridLineWidth: 0,
								title: {
									text: 'Stock Price'
								},
								labels: {
									format: '{value}'
								},
								opposite: false,
								min: 0
							},
							{
								// Secondary yAxis
								labels: {
									formatter: function () {
										if (this.value !== 0) {
											return (
												(this.value / 1000).toString() +
												'k'
											)
										} else {
											return this.value
										}
									}
								},
								title: {
									text: 'Volume'
								},
								min: 0
							}
						],
						tooltip: {
							shared: true
						},
						series: [
							{
								name: `${text.value.toUpperCase()}`,
								type: 'area',
								yAxis: 0,
								data: prices,
								gapSize: 5,
								tooltip: {
									valueDecimals: 2
								},
								fillColor: {
									linearGradient: {
										x1: 0,
										y1: 0,
										x2: 0,
										y2: 1
									},
									stops: [
										[0, Highcharts.getOptions().colors[0]],
										[
											1,
											Highcharts.color(
												Highcharts.getOptions()
													.colors[0]
											)
												.setOpacity(0)
												.get('rgba')
										]
									]
								},
								threshold: null
							},
							{
								name: `${text.value.toUpperCase()} Volume`,
								type: 'column',
								yAxis: 1,
								data: volumes,
								tooltip: {
									valueSuffix: ''
								}
							}
						],
						plotOptions: {
							series: {
								pointWidth: 3
							}
						}
					})
				}
			} else {
				console.log(`error ${req.status} ${req.statusText}`)
			}
		}
	}
}

news.onclick = () => {
	if (text.value) {
		let req = new XMLHttpRequest()
		let url = `${baseURL}/news?keyword=${text.value}`

		req.open('GET', url)

		req.send()

		req.onload = () => {
			if (req.status === 200) {
				const data = JSON.parse(req.response)

				if (data.totalResult === 0) {
					alert('No news found.')
				} else {
					error.style.display = 'none'
					nav.style.display = 'block'
					content.style.display = 'block'

					news.focus()

					// Filter news
					let topNews = []
					const articles = data.articles
					for (let i = 0; i < articles.length; i++) {
						if (topNews.length >= 5) {
							break
						}

						if (
							articles[i].title &&
							articles[i].url &&
							articles[i].urlToImage &&
							articles[i].publishedAt
						) {
							topNews.push(articles[i])
						}
					}

					content.innerHTML = ''

					topNews.map((news) => {
						let date = new Date(news.publishedAt)
						let formattedDate =
							(date.getMonth() > 8
								? date.getMonth() + 1
								: '0' + (date.getMonth() + 1)) +
							'/' +
							(date.getDate() > 9
								? date.getDate()
								: '0' + date.getDate()) +
							'/' +
							date.getFullYear()

						content.innerHTML +=
							'<div class="news-container">' +
							`<img class="news-img" src="${news.urlToImage}" />` +
							'<div class="news-inner">' +
							`<span class="news-title">${news.title}</span><br />` +
							`<span class="news-date">Published Date: &nbsp &nbsp ${formattedDate}</span><br />` +
							`<span class="news-url"><a target="_blank" rel="noopener noreferrer" href="${news.url}">See Original Post</a></span>` +
							'</div>' +
							'</div>'
					})
				}
			} else {
				console.log(`error ${req.status} ${req.statusText}`)
			}
		}
	}
}
