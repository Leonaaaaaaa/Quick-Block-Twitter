function addButtonToTweets() {
    const tweets = document.querySelectorAll("article");

    Array.from(tweets).forEach((tweet) => {
        if (!tweet.querySelector('.block-btn')) {
            const buttonContainer = document.createElement('button');
            buttonContainer.setAttribute('aria-label', 'Block');
            buttonContainer.classList.add('block-btn');

            const svgContainer = document.createElement('div');
            svgContainer.innerHTML = `
                <svg viewBox="0 0 24 24" aria-hidden="true" class="r-4qtqp9 r-yyyyoo r-dnmrzs r-bnwqim r-lrvibr r-m6rgpd r-1xvli5t r-1hdv0qi download-btn">
                    <g>
                        <path d="M12 3.75c-4.55 0-8.25 3.69-8.25 8.25 0 1.92.66 3.68 1.75 5.08L17.09 5.5C15.68 4.4 13.92 3.75 12 3.75zm6.5 3.17L6.92 18.5c1.4 1.1 3.16 1.75 5.08 1.75 4.56 0 8.25-3.69 8.25-8.25 0-1.92-.65-3.68-1.75-5.08zM1.75 12C1.75 6.34 6.34 1.75 12 1.75S22.25 6.34 22.25 12 17.66 22.25 12 22.25 1.75 17.66 1.75 12z"></path>
                    </g>
                </svg>
            `;

            buttonContainer.appendChild(svgContainer);
            buttonContainer.addEventListener('click', () => {
                blockUser(tweet);
            });

            const actionBar = tweet.querySelector('div[role="group"]');
            if (actionBar) {
                actionBar.appendChild(buttonContainer);
            }
        }
    });
}

function blockUser(tweet) {
    const blockButton = tweet.querySelector('button[aria-label="More"]');
    
    if (blockButton) {
        blockButton.click();
        
        const waitForDropdown = setInterval(() => {
            const dropdownBlockButton = document.querySelector('div[role="menuitem"][data-testid="block"]');
            
            if (dropdownBlockButton) {
                dropdownBlockButton.click();
                clearInterval(waitForDropdown);
                
                const waitForConfirm = setInterval(() => {
                    const confirmBlockButton = document.querySelector('button[data-testid="confirmationSheetConfirm"]');
                    
                    if (confirmBlockButton) {
                        confirmBlockButton.click();
                        clearInterval(waitForConfirm);
                    }
                }, 25);
            }
        }, 25);
    }
}


window.addEventListener('load', () => {
    const observer = new MutationObserver(addButtonToTweets);
    observer.observe(document.body, { childList: true, subtree: true });

    addButtonToTweets();
});
