const modal = $.modal({
    closable: true,
    onClose: function () {
        console.log('Закрыто')
    },
    onOpen: () => console.log('Открыто')
})