function _createModal (options) {
    const modal = document.createElement('div')
    const content = options.content || ''
    const width = options.width || '660px'
    const title = options.title || 'iBox'
    const closable = options.closable ? `<button modal-close="" class="modal__close">&times;</button>` : ''

    modal.classList.add('imodal')
    modal.insertAdjacentHTML('beforeend', `
        <div modal-close="" class="modal__overlay">
            <div class="modal__window" style="width:${width}">
                <div class="modal__header">
                    <h3 class="modal__title">${title}</h3>
                    ${closable}
                </div>
                <div class="modal__body">
                   ${content}
                </div>
                <div class="modal__footer"> 
                    <button class="modal__button">Ok</button>
                    <button modal-close="" class="modal__button">Close</button></div>
                </div>
        </div>`)
    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    const onClose = options.onClose ? options.onClose : () => false
    const onOpen = options.onOpen ? options.onOpen : () => false
    const beforeClose = options.beforeClose ? options.beforeClose : () => true

    let isClosing = false
    let isOpen = false

    addClosingEventToButtons()
    checkModalStatus()

    function addClosingEventToButtons () {
        const closeButtons = $modal.querySelectorAll('[modal-close]')

        for (const button of closeButtons) {
            button.addEventListener('click', closeModal)
        }
    }

    function closeModal () {
        isClosing = true
        $modal.classList.add('hiding')
        $modal.classList.remove('open')

        setTimeout(() => {
            $modal.classList.remove('hiding')
            isClosing = false
            isOpen = false
            checkModalStatus()

        }, ANIMATION_SPEED)
    }

    function openModal () {
        !isClosing && $modal.classList.add('open')
        isOpen = true
        checkModalStatus()
    }

    function checkModalStatus () {
        isOpen ? onOpen() : onClose() 
    }
    
    return {
        open () {
            openModal ()
        },
        close () {
            beforeClose() && closeModal ()
        },
        destroy () {
            $modal.remove()
        },
        setContent(html) {
            $modal.querySelector('.modal__body').innerHTML = html
        }
    }
}