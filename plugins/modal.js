function _createModal (options) {
    const modal = document.createElement('div')
    modal.classList.add('imodal')
    modal.insertAdjacentHTML('beforeend', `
        <div class="modal__overlay">
            <div class="modal__window">
                <div class="modal__header">
                    <h3 class="modal__title">Lorem ipsum dolor sit amet.</h3>
                    <button class="modal__close">&times;</button>
                </div>
                <div class="modal__body">
                    <p>Lorem ipsum dolor sit.</p>
                    <p>Lorem ipsum dolor sit.</p>
                </div>
                <div class="modal__footer"> 
                    <button class="modal__button">Ok</button>
                    <button class="modal__button">Close</button></div>
                </div>
        </div>`)

    document.body.appendChild(modal)
    return modal
}

$.modal = function(options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let isClosing = false

    return {
        open () {
            !isClosing && $modal.classList.add('open')
        },
        close () {
            isClosing = true
            $modal.classList.add('hiding')
            $modal.classList.remove('open')

            setTimeout(() => {
                $modal.classList.remove('hiding')
                isClosing = false
            }, ANIMATION_SPEED)
        },
        destroy () {}
    }
}