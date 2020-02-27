Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {

}

function _createModalFooter (buttons = []) {
    if(buttons.length === 0) {
        return ''
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal__footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('btn')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop
        
        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(options) {
    const DEFAULT_WIDTH = '660px'
    const modal = document.createElement('div')
    const content = options.content || ''
    const width = options.width || DEFAULT_WIDTH
    const title = options.title || 'iBox'
    const closable = options.closable ? `<button data-close="true" class="modal__close">&times;</button>` : ''

    modal.classList.add('imodal')
    modal.insertAdjacentHTML('beforeend', `
        <div data-close="true" class="modal__overlay">
            <div class="modal__window" style="width:${width}">
                <div class="modal__header">
                    <h3 class="modal__title" data-title>${title}</h3>
                    ${closable}
                </div>
                <div class="modal__body" data-content>
                   ${content}
                </div>
            </div>
        </div>`)
    
    const footer = _createModalFooter(options.footerButtons)
    if(footer) {
        footer.appendAfter(modal.querySelector('[data-content]'))
    }

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
    let isDestroyed = false

    const modal = {
        open () {
            if(isDestroyed) {
               return console.log('Modal has been destroyed')
            }

            !isClosing && $modal.classList.add('open')
            isOpen = true
            checkModalStatus()
        },
        close () {
            if(beforeClose()){
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
        }
    }

    checkModalStatus()

    $modal.addEventListener('click', closeModalListener)

    function closeModalListener (event) {
        if(event.target.dataset.close) {     
            modal.close()
        }
    } 

    function checkModalStatus () {
        isOpen ? onOpen() : onClose() 
    }
    
    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', closeModalListener)
            isDestroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        },
        setTitle(html) {
            $modal.querySelector('[data-title]').innerHTML = html
        }
    })
}