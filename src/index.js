const main = () => {
    try {
        require('./app');
    } catch (error) {
        console.log('Error while starting the app', error);
    }
}

main();