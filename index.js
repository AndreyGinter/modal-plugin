let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
  ]

  const makeCard = card => `
    <div class="col">
        <div class="card">
          <img
              src="${card.img}"
              class="card-img-top"
              height="250"
          />
          <div class="card-body">
              <h5 class="card-title">${card.title}</h5>
              <a href="#" class="btn btn-primary" data-btn="price" data-id="${card.id}">Посмотреть цену</a>
              <a href="#" class="btn btn-danger" data-btn="delete" data-id="${card.id}">Удалить</a>
          </div>
        </div>
      </div>`

  function render() {
    const html = fruits.map(makeCard).join('')
    document.querySelector('[data-fruits]').innerHTML = html
  }

  render()

  const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    footerButtons: [{
      text: 'Окей', type: 'primary', handler() {
        priceModal.close()
      }
    }]
  })

  document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const btnId = parseInt(event.target.dataset.id)
    const fruit = fruits.find(f => f.id === btnId)
    
    if(btnType === 'price') {   
       priceModal.setContent(`
        <p class="price-title">${fruit.title}: <span class="price">${fruit.price}$</span></p> 
      `)
      priceModal.open()
    }

    else if(btnType === 'delete') {
      $.confirm({
        content: `<p class="price-title">Вы удаляете: <span class="price">${fruit.title}</span></p>`,
        title: 'Вы уверен?'
      }).then(() => {
        fruits = fruits.filter(f => f.id !== btnId)
        render()
      }).catch(() => {
        console.log('Отмена')
      }
      )
   }
  })


