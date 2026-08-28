/* =====================================================
   دریافت League ID از URL
===================================================== */

const params = new URLSearchParams(window.location.search);

const leagueId = params.get("id");


/* =====================================================
   اطلاعات لیگ‌ها
===================================================== */

const leagues = {

    "4328": {
        name: "لیگ برتر انگلیس",
        flag: "🇬🇧",
        description:
            "نتایج، جدول و بازی‌های آینده لیگ برتر انگلیس در پرشین ورزش."
    },

    "4335": {
        name: "لالیگا",
        flag: "🇪🇸",
        description:
            "نتایج، جدول و بازی‌های آینده لالیگا اسپانیا در پرشین ورزش."
    },

    "4332": {
        name: "سری آ",
        flag: "🇮🇹",
        description:
            "نتایج، جدول و بازی‌های آینده سری آ ایتالیا در پرشین ورزش."
    },

    "4331": {
        name: "بوندس‌لیگا",
        flag: "🇩🇪",
        description:
            "نتایج، جدول و بازی‌های آینده بوندس‌لیگا آلمان در پرشین ورزش."
    },

    "4334": {
        name: "لیگ فرانسه",
        flag: "🇫🇷",
        description:
            "نتایج، جدول و بازی‌های آینده لیگ فرانسه در پرشین ورزش."
    }

};


/* =====================================================
   SEO صفحه لیگ
===================================================== */

if (leagueId && leagues[leagueId]) {

    const league = leagues[leagueId];

    const fullName =
        `${league.flag} ${league.name}`;

    const pageTitle =
        `${league.name} | نتایج، جدول و بازی‌های آینده | پرشین ورزش`;

    const pageDescription =
        league.description;


    /* عنوان صفحه */

    document.title = pageTitle;


    /* عنوان داخل صفحه */

    const leagueTitle =
        document.getElementById("leagueTitle");

    if (leagueTitle) {

        leagueTitle.textContent =
            fullName;

    }


    /* توضیحات */

    const description =
        document.getElementById("leagueDescription");

    if (description) {

        description.textContent =
            pageDescription;

    }


    /* Meta Description */

    const metaDescription =
        document.querySelector('meta[name="description"]');

    if (metaDescription) {

        metaDescription.setAttribute(
            "content",
            pageDescription
        );

    }


    /* Canonical */

    const canonical =
        document.getElementById("canonicalLink");

    const canonicalURL =
        `https://nikanstudio.github.io/Iranvarzesh/league.html?id=${leagueId}`;

    if (canonical) {

        canonical.setAttribute(
            "href",
            canonicalURL
        );

    }


    /* Open Graph */

    const ogTitle =
        document.getElementById("ogTitle");

    if (ogTitle) {

        ogTitle.setAttribute(
            "content",
            pageTitle
        );

    }


    const ogDescription =
        document.getElementById("ogDescription");

    if (ogDescription) {

        ogDescription.setAttribute(
            "content",
            pageDescription
        );

    }


    const ogUrl =
        document.getElementById("ogUrl");

    if (ogUrl) {

        ogUrl.setAttribute(
            "content",
            canonicalURL
        );

    }


    /* Twitter */

    const twitterTitle =
        document.getElementById("twitterTitle");

    if (twitterTitle) {

        twitterTitle.setAttribute(
            "content",
            pageTitle
        );

    }


    const twitterDescription =
        document.getElementById("twitterDescription");

    if (twitterDescription) {

        twitterDescription.setAttribute(
            "content",
            pageDescription
        );

    }


    /* =================================================
       بازی‌های آینده
    ================================================= */

    fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventsnextleague.php?id=${leagueId}`
    )

        .then(response => response.json())

        .then(data => {

            const matchesBox =
                document.getElementById("matches");

            if (!matchesBox) return;


            if (
                !data.events ||
                data.events.length === 0
            ) {

                matchesBox.innerHTML =
                    "<p>بازی آینده‌ای پیدا نشد.</p>";

                return;

            }


            let html = "";


            data.events
                .slice(0, 5)
                .forEach(match => {

                    html += `

                        <div class="card">

                            <h3>
                                ${match.strHomeTeam}
                                🆚
                                ${match.strAwayTeam}
                            </h3>

                            <p>
                                📅 ${match.dateEvent || "نامشخص"}
                            </p>

                            <p>
                                🕒 ${match.strTime || "نامشخص"}
                            </p>

                        </div>

                    `;

                });


            matchesBox.innerHTML = html;

        })

        .catch(error => {

            const matchesBox =
                document.getElementById("matches");

            if (matchesBox) {

                matchesBox.innerHTML =
                    "<p>دریافت اطلاعات بازی‌ها با مشکل مواجه شد.</p>";

            }

            console.error(error);

        });


    /* =================================================
       آخرین نتیجه
    ================================================= */

    fetch(
        `https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=${leagueId}`
    )

        .then(response => response.json())

        .then(data => {

            const lastMatchBox =
                document.getElementById("lastMatch");

            if (!lastMatchBox) return;


            if (
                !data.events ||
                data.events.length === 0
            ) {

                lastMatchBox.innerHTML =
                    "<p>نتیجه‌ای پیدا نشد.</p>";

                return;

            }


            const match =
                data.events[0];


            lastMatchBox.innerHTML = `

                <div class="card">

                    <h3>

                        ${match.strHomeTeam}

                        ${match.intHomeScore ?? "-"}

                        -

                        ${match.intAwayScore ?? "-"}

                        ${match.strAwayTeam}

                    </h3>

                    <p>
                        📅 ${match.dateEvent || "نامشخص"}
                    </p>

                </div>

            `;

        })

        .catch(error => {

            console.error(error);

        });


    /* =================================================
       جدول لیگ
    ================================================= */

    fetch(
        `https://www.thesportsdb.com/api/v1/json/123/lookuptable.php?l=${leagueId}`
    )

        .then(response => response.json())

        .then(data => {

            const tableBox =
                document.getElementById("leagueTable");

            if (!tableBox) return;


            if (
                !data.table ||
                data.table.length === 0
            ) {

                tableBox.innerHTML =
                    "<p>جدول لیگ در دسترس نیست.</p>";

                return;

            }


            let html = `

                <table class="matches-table">

                    <thead>

                        <tr>

                            <th>رتبه</th>

                            <th>تیم</th>

                            <th>امتیاز</th>

                        </tr>

                    </thead>

                    <tbody>

            `;


            data.table
                .slice(0, 10)
                .forEach(team => {

                    html += `

                        <tr>

                            <td>
                                ${team.intRank}
                            </td>

                            <td>

                                <img
                                    src="${team.strBadge || ""}"
                                    width="30"
                                    height="30"
                                    alt="لوگوی ${team.strTeam}"
                                >

                                ${team.strTeam}

                            </td>

                            <td>
                                ${team.intPoints}
                            </td>

                        </tr>

                    `;

                });


            html += `

                    </tbody>

                </table>

            `;


            tableBox.innerHTML = html;

        })

        .catch(error => {

            console.error(error);

        });


} else if (leagueId) {

    /*
       اگر ID لیگ نامعتبر باشد
    */

    document.title =
        "لیگ فوتبال | پرشین ورزش";

}


/* =====================================================
   نتایج واقعی صفحه اصلی
===================================================== */

const resultsBox =
    document.getElementById("realResults");


if (resultsBox) {

    fetch(
        "https://www.thesportsdb.com/api/v1/json/123/eventspastleague.php?id=4328"
    )

        .then(response => response.json())

        .then(data => {

            let html = "";


            if (data.events) {

                data.events
                    .slice(0, 5)
                    .forEach(match => {

                        html += `

                            <div class="card">

                                <h3>

                                    ${match.strHomeTeam}

                                    ${match.intHomeScore ?? "-"}

                                    -

                                    ${match.intAwayScore ?? "-"}

                                    ${match.strAwayTeam}

                                </h3>

                                <p>
                                    📅 ${match.dateEvent || "نامشخص"}
                                </p>

                                <p>
                                    🏆 ${match.strLeague || ""}
                                </p>

                            </div>

                        `;

                    });

            }


            resultsBox.innerHTML = html;

        })

        .catch(error => {

            console.error(error);

        });

}


/* =====================================================
   مسابقات امروز
===================================================== */

const todayBox =
    document.getElementById("todayMatches");


if (todayBox) {

    /*
       تاریخ را بعداً می‌توانیم کاملاً خودکار کنیم.
    */

    fetch(
        "https://www.thesportsdb.com/api/v1/json/123/eventsday.php?d=2026-07-29&s=Soccer"
    )

        .then(response => response.json())

        .then(data => {

            let html = "";


            if (data.events) {

                data.events
                    .slice(0, 10)
                    .forEach(match => {

                        html += `

                            <div class="card">

                                <h3>

                                    ${match.strHomeTeam}

                                    🆚

                                    ${match.strAwayTeam}

                                </h3>

                                <p>
                                    🕒 ${match.strTime || "نامشخص"}
                                </p>

                                <p>
                                    🏆 ${match.strLeague || "نامشخص"}
                                </p>

                                <p>
                                    🏟️ ${match.strVenue || "نامشخص"}
                                </p>

                            </div>

                        `;

                    });

            }


            todayBox.innerHTML = html;

        })

        .catch(error => {

            console.error(error);

        });

}


/* =====================================================
   حالت شب
===================================================== */

function toggleTheme() {

    document.body.classList.toggle("dark");

}


/* =====================================================
   جستجوی لیگ
===================================================== */

const searchBox =
    document.getElementById("searchBox");


if (searchBox) {

    searchBox.addEventListener(
        "keyup",
        function () {

            const filter =
                this.value.toLowerCase();


            document
                .querySelectorAll(".league-item")
                .forEach(item => {

                    item.style.display =
                        item.innerText
                            .toLowerCase()
                            .includes(filter)
                            ? "block"
                            : "none";

                });

        }
    );

}


/* =====================================================
   بازگشت به بالای صفحه
===================================================== */

function goTop() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}
