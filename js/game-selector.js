$(document).ready(function() {
    const gameLinks = {
        "Minecraft": {
            "USA": "minecraft.php?location=usa",
            "Germany": "minecraft.php?location=germany",
            "France": "minecraft.php?location=france",
            "default": "minecraft.php"
        },
        "RUST": "rust",
        "FiveM": "fivem",
        "ARK: Survival Evolved": {
            "USA": "ark.php?location=USA",
            "Germany": "ark.php?location=Germany",
            "France": "ark.php?location=France",
            "default": "ark.php"
        },
        "Terraria": "terraria",
        "Palworld": "palworld"
    };

    const locationImages = {
        "USA": "assets/images/country/unitedstates.svg",
        "Germany": "assets/images/country/germany.svg",
        "France": "assets/images/country/france.svg"
    };

    let selectedGame = "";

    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 4,
        spaceBetween: 20,
        navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
        },
        breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        640: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 20,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20,
        },
        }
    });

    $('#game .card').on('click', function() {
        selectedGame = $(this).find('h4').text();
        if (selectedGame === "Terraria") {
        window.location.href = gameLinks[selectedGame];
        } else if (selectedGame === "Palworld") {
        return;
        } else if (typeof gameLinks[selectedGame] === 'string') {
        window.location.href = gameLinks[selectedGame];
        } else {
        $('#location .row').empty();
        const locations = gameLinks[selectedGame];
        if (locations.default) {
            delete locations.default;
        }
        for (let location in locations) {
            $('#location .row').append(`
            <div class="col-lg-3">
                <div class="card card-location mb-4">
                    <div class="card-body d-flex justify-content-center align-items-center">
                        <img src="${locationImages[location]}" class="me-2" alt="${location} Location">
                        <h4 class="mb-0">${location}</h4>
                    </div>
                </div>
            </div>
            `);
        }
        if ($('#location .row').children().length === 0) {
            window.location.href = gameLinks[selectedGame].default;
        } else {
            $('#game').fadeOut(function() {
            $('#location').fadeIn().addClass('active');
            }).removeClass('active');
        }
        }
    });

    $('#location').on('click', '.card', function() {
        const selectedLocation = $(this).find('h4').text();
        const redirectUrl = gameLinks[selectedGame][selectedLocation] || gameLinks[selectedGame].default;
        window.location.href = redirectUrl;
    });

    $('#back').on('click', function() {
        $('#location').fadeOut(function() {
        $('#game').fadeIn().addClass('active');
        }).removeClass('active');
    });
});