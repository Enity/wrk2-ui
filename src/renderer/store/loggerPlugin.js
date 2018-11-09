export function loggerPlugin(store) {
    store.subscribeAction(action => {
        console.log(
            `%cDispatched "${action.type}". Payload:`,
            'color: white;background: #1c664c; padding: 2px;',
            action.payload === undefined ? 'none' : action.payload
        );
    });
    /* store.subscribe( mutation => {
        console.log(
            `%cCommited "${mutation.type}"`,
            'color: white;background: #7c5404; padding: 2px'
        );
    }); */
}
