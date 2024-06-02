document.addEventListener("DOMContentLoaded", function() {
    // Function to handle highlighting menu items and loading content based on hash
    function handleMenuClick() {
        // Get the hash value from the URL
        var hash = window.location.hash;
        // Set default hash value to "#page1" if empty
        if (!hash) {
            hash = "#page1";
            window.location.hash = hash;
        }

        // Get all menu items
        var menuLinks = document.querySelectorAll('.bux-menu__link');

        // Loop through each menu item
        menuLinks.forEach(function(link) {
            // If the href matches the hash value, add the active class
            if (link.getAttribute('href') === hash) {
                link.classList.add('bux-menu__link--active');
            } else {
                link.classList.remove('bux-menu__link--active');
            }

            // Add click event listener to each menu item
            link.addEventListener('click', function(event) {
                event.preventDefault();

                // Remove active class from all menu items
                menuLinks.forEach(function(item) {
                    item.classList.remove('bux-menu__link--active');
                });

                // Add active class to the clicked menu item
                this.classList.add('bux-menu__link--active');

                // Update the URL hash
                window.location.hash = this.getAttribute('href');

                // Load content based on the hash
                loadContent(window.location.hash);
            });
        });

        // Load content based on the hash when the page loads
        loadContent(hash);
    }

    // Function to load content based on the hash value
    function loadContent(hash) {
        // Check if the hash is not empty
        if (hash !== "") {
            // Fetch the content from the corresponding HTML file
            fetch(hash.slice(1) + '.html') // Remove '#' and add '.html' to get the filename
            .then(response => response.text())
            .then(data => {
                document.getElementById('main-content').innerHTML = data;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }

    // Call the function to handle menu clicks and load content based on hash
    handleMenuClick();
});
