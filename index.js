const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://fashion-stil.ru/wp-content/uploads/2019/04/apelsin-ispaniya-kg-92383155888981_small6.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'https://itsfresh.ru/upload/iblock/178/178d8253202ef1c7af13bdbd67ce65cd.jpg'},
  ]

  makeFruitsList(fruits)

function makeFruitsList(fruits) {
    const fruitsList = document.querySelector('[data-fruits]')
    let modal = {}
    modal.window = window

    fruits.forEach(fruit => {
        const $fruit = document.createElement('div')
        let isDeleteCreated = false
        let isPriceCreated = false
        $fruit.classList.add('col')

        $fruit.innerHTML = makeFruitCard(fruit)
        $fruit.setAttribute('data-id', fruit.id)

        $fruit.querySelector('[data-price]').addEventListener('click', () => openPriceModal(event))
        $fruit.querySelector('[data-delete]').addEventListener('click', () => openDeleteModal(event))

        fruitsList.insertAdjacentElement('beforeend', $fruit)

        function openPriceModal(event) {  
            event.preventDefault()

            if(isDeleteCreated) {
                modal.destroy()
                isDeleteCreated = false
            }

            if(isPriceCreated) {
                modal.setTitle(fruit.title)
                modal.setContent(makePriceContent())
                modal.open()
                return
            }
    
            modal = $.modal({
                title: fruit.title,
                closable: true,
                content: makePriceContent()
            })
            isPriceCreated = true

            modal.open()

            function makePriceContent() {
                return  `
                    <span class="price-title">Цена на ${fruit.title}:</span>
                    <span class="price">${fruit.price} рублей</span>
                `
            }
        }

        function openDeleteModal(event) {
            event.preventDefault()

            if(isPriceCreated) {
                modal.destroy()
                isPriceCreated = false
            }

            if(isDeleteCreated) {
                modal.setTitle(fruit.title)
                modal.open()
                return
            }
    
            modal = $.modal({
                title: `Удалить ${fruit.title} ?`,
                closable: true,
                footerButtons: [
                    {
                        text: 'Удалить', type: 'danger', handler() {
                            deleteFruitCard()
                        }
                    },
                    {
                        text: 'Отмена', handler() {
                            modal.close()
                        }
                    }
                ]
            })
            isDeleteCreated = true

            modal.open()

            function deleteFruitCard() {
                const card = fruitsList.querySelector(`[data-id="${fruit.id}"]`)
                card.querySelector('[data-price]').removeEventListener('click', () => openPriceModal(event))
                card.querySelector('[data-delete]').removeEventListener('click', () => openDeleteModal(event))
                card.parentNode.removeChild(card)
                
                modal.destroy()
                isDeleteCreated = false
            }

        }


    })

    

    function makeFruitCard(fruit) {
        const img = fruit.img || ''
        const title = fruit.title || 'Неизвестный фрукт'
    
        return `
            <div class="card">
                <img
                    src="${img}"
                    class="card-img-top"
                    height="250"
                />
                <div class="card-body">
                    <h5 class="card-title">${title}</h5>
                    <a href="#" class="btn btn-primary" data-price>Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-delete>Удалить</a>
                </div>
            </div>`
    }
}

