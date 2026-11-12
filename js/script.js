
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.toggle');
    const nav = document.querySelector('nav');

    toggle?.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    const buttons = document.querySelectorAll('.filters button');
    const items = document.querySelectorAll('.menu-list article');
    const search = document.querySelector('#search');

    let filter = 'tutti';

    function refresh() {
        const q = (search?.value || '').toLowerCase();

        items.forEach(i => {
            i.classList.toggle(
                'hidden',
                !(
                    (filter === 'tutti' || i.dataset.cat === filter) &&
                    i.textContent.toLowerCase().includes(q)
                )
            );
        });
    }

    buttons.forEach(b => {
        b.addEventListener('click', () => {
            buttons.forEach(x => x.classList.remove('active'));

            b.classList.add('active');
            filter = b.dataset.filter;

            refresh();
        });
    });

    search?.addEventListener('input', refresh);

    const date = document.querySelector('#date');

    if (date) {
        const d = new Date();

        date.min = new Date(
            d - d.getTimezoneOffset() * 60000
        ).toISOString().slice(0, 10);
    }

    document.querySelector('#booking')?.addEventListener('submit', e => {
        e.preventDefault();

        const name = new FormData(e.target).get('name');

        document.querySelector('#message').textContent =
            `Grazie ${name}! Modulo compilato`;

        e.target.reset();
    });
});
