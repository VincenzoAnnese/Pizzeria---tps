# Relazione Tecnica: Sviluppo del Sito Web Pizzeria "Peperoncino"

## 1. Introduzione e Analisi del Contesto

### 1.1 Inquadramento del Progetto e Dominio Applicativo

Il progetto riguarda la progettazione e la realizzazione del sito web front-end per la **Pizzeria Peperoncino**, una pizzeria presente sul territorio di Molfetta (BA). Nel settore moderno della ristorazione, la presenza digitale non costituisce soltanto una vetrina informativa, ma rappresenta il punto primario di contatto tra l'attività e la clientela.

L'obiettivo strategico dell'applicazione è trasmettere i valori cardine del brand — artigianalità, selezione delle materie prime, lievitazione lenta e accoglienza familiare — attraverso un'interfaccia utente (UI) elegante, rapida nel caricamento e altamente usabile su una vasta gamma di dispositivi hardware.

### 1.2 Analisi dei Requisiti di Business e Target Utente

L'analisi del pubblico di riferimento (target di varie fasce d'età, dai giovani studenti alle famiglie) ha evidenziato l'esigenza di una navigazione priva di ostacoli. Le necessità prioritarie individuate includono:

1. **Accessibilità Immediata alle Informazioni:** Chiarezza su orari di apertura, ubicazione geografica e contatti diretti.

2. **Consultazione Dinamica del Menù:** Possibilità di filtrare rapidamente le pietanze in base alle preferenze alimentari o alle categorie (Pizze Classiche, Speciali, Fritti, Dolci) e di effettuare ricerche per testo libero.

3. **Prenotazione Efficiente:** Minimizzazione dei passaggi richiesti per richiedere un tavolo, evitando l'obbligo di registrazione da parte dell'utente.

### 1.3 Requisiti Tecnici di Sistema

#### 1.3.1 Requisiti Funzionali

* **RF-01 (Navigazione Multi-pagina):** L'applicazione deve articolarsi su 6 sezioni distinte: Home Page (`index.html`), Chi Siamo (`chi-siamo.html`), Menù (`menu.html`), Galleria (`gallery.html`), Contatti (`contatti.html`) e Prenotazioni (`prenota.html`).

* **RF-02 (Menu Responsive / Hamburger Toggle):** Sui dispositivi mobile con larghezza di viewport $W \le 800\text{px}$, la barra di navigazione deve trasformarsi in un menu a comparsa gestibile tramite un pulsante dedicato.

* **RF-03 (Filtraggio Dinamico del Menù):** Nella pagina `menu.html`, l'utente deve poter filtrare i prodotti mediante pulsanti di categoria (`data-filter`).

* **RF-04 (Ricerca Testuale in Tempo Reale):** Nella pagina `menu.html`, l'inserimento di testo nell'input `#search` deve nascondere istantaneamente gli elementi non corrispondenti.

* **RF-05 (Validazione Temporalmente Corretta dei Form):** Nel form di prenotazione (`prenota.html`), il campo data (`#date`) non deve consentire la selezione di date passate rispetto al giorno corrente.

* **RF-06 (Feedback di Invio Form):** L'invio del modulo di prenotazione deve intercettare il comportamento di default del browser, simulare la gestione dell'invio e fornire un messaggio di conferma personalizzato.

#### 1.3.2 Requisiti Non Funzionali

* **RNF-01 (Prestazioni Elevate):** Sviluppo in architettura *Vanilla Web Stack* (HTML5, CSS3, JavaScript) senza l'impiego di librerie o framework pesanti (es. Bootstrap, jQuery, React), garantendo tempi di prima renderizzazione ridotti.

* **RNF-02 (Responsive Design Fluid):** Layout adattabile in modo continuo da schermi Desktop $W > 1200\text{px}$ a dispositivi Mobile $W \le 540\text{px}$.

* **RNF-03 (Semantica e Accessibilità Standard W3C):** Utilizzo rigoroso dei tag HTML5 semantici e di attributi ARIA per la fruibilità tramite screen reader.

---

## 2. Architettura Progettuale e Spiegazione del Codice

### 2.1 Struttura Modulare dei File

La struttura del codice segue una netta separazione delle responsabilità (Separation of Concerns):

```
├── chi-siamo.html   # Pagina istituzionale e valori aziendali
├── contatti.html    # Informazioni di contatto, orari e mappa
├── gallery.html     # Galleria fotografica dei prodotti e della location
├── index.html       # Landing page con sezioni Hero e Pizze in evidenza
├── menu.html        # Menù interattivo con filtri e motore di ricerca interno
├── prenota.html     # Form interattivo per la prenotazione del tavolo
├── css/
│   └── style.css    # Foglio di stile unico (Design system, Flexbox, Grid)
└── js/
    └── script.js    # Logica applicativa unica (Gestione menu mobile, filtri, form)
```

### 2.2 Spiegazione Dettagliata dell'HTML5 (Struttura e Semantica)

#### 2.2.1 Architettura Generale dei Documenti

Ogni file HTML condivide l'intestazione `<head>` standardizzata per garantire la compatibilità multipiattaforma e la corretta indicizzazione:

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Peperoncino Pizzeria: tradizione, ingredienti scelti e gusto.">
```

* **`viewport`:** La direttiva `width=device-width, initial-scale=1` è fondamentale per il corretto funzionamento delle media query CSS sui dispositivi mobili.

* **Script Defer:** Lo script principale è incluso nella sezione `<head>` con l'attributo `defer`:

  ```html
  <script defer src="js/script.js"></script>
  ```

  L'attributo `defer` ordina al browser di scaricare lo script in background senza bloccare il parsing dell'HTML, eseguendolo unicamente dopo che la struttura del DOM è stata completamente costruita.

#### 2.2.2 Analisi Semantica dei Componenti Principali

1. **Header e Navigazione (`<header>`, `<nav>`):**

   ```html
   <header>
       <a class="logo" href="index.html">🌶 Peperoncino</a>
       <button class="toggle" aria-label="Apri menu">☰</button>
       <nav>
           <a class="active" href="index.html">Home</a>
           <a href="chi-siamo.html">La pizzeria</a>
           ...
       </nav>
   </header>
   ```

   * Il tag `<header>` delimita la barra di navigazione principale.
   * La classe `.active` applicata al link della pagina corrente fornisce il riferimento visivo per l'utente.
   * Il pulsante `<button class="toggle">` include l'attributo `aria-label="Apri menu"`, garantendo che la sua funzione sia chiara alle tecnologie assistive anche in assenza di un testo visibile esplicito.

2. **Sezioni Hero (`<section class="pagehero ...">`):**
   Utilizzate come intestazioni d'impatto visivo in ogni pagina. La struttura interna prevede un contenitore `<div>` con un piccolo testo identificativo (`<p class="eyebrow">`), un titolo principale `<h1>` con enfasi stilistica tramite `<em>` ed un testo descrittivo.

3. **Pagina Menù (`menu.html`) e Data Attributes:**
   Il menù è strutturato mediante una serie di articoli semantici `<article>`, ognuno dei quali descrive un piatto. Per facilitare il filtraggio via JavaScript, è stato implementato l'attributo personalizzato HTML5 `data-cat`:

   ```html
   <article data-cat="classiche">
       <div>
           <h3>Margherita</h3>
           <p>Pomodoro, fior di latte, basilico</p>
       </div>
       <b>€ 7,50</b>
   </article>
   ```

   L'attributo `data-cat="classiche"` associa univocamente la voce alla categoria di appartenenza (`classiche`, `speciali`, `fritti`, `dolci`), consentendo al codice JS di accedere a tale valore tramite l'interfaccia `element.dataset.cat`.

4. **Form di Prenotazione (`prenota.html`):**

   ```html
   <form id="booking">
       <label>
           Nome e cognome
           <input name="name" required placeholder="Il tuo nome">
       </label>
       <div class="formrow">
           <label>
               Data
               <input type="date" id="date" name="date" required>
           </label>
           <label>
               Orario
               <select required name="time"> ... </select>
           </label>
       </div>
       ...
       <p id="message" role="status"></p>
   </form>
   ```

   * I campi di input sono racchiusi direttamente all'interno dei tag `<label>`, espandendo l'area cliccabile per il campo e migliorando l'usabilità su touch screen.
   * L'elemento `<p id="message" role="status"></p>` è un'area dinamica per il feedback dell'utente: l'attributo `role="status"` notifica agli screen reader qualsiasi aggiornamento del contenuto senza interrompere l'utente.

### 2.3 Spiegazione del CSS3 (`css/style.css`)

#### 2.3.1 Variabili CSS e Design System

Il foglio di stile impiega Custom Properties definite all'interno dello pseudo-selettore `:root`, consentendo la centralizzazione dei parametri visivi fondamentali:

```css
:root {
    --red: #b83b2d;
    --ink: #292722;
    --cream: #f7f2e9;
    --muted: #77736c;
    --line: #e7dfd4;
}
```

* `--red`: Utilizzato per call-to-action (CTA), evidenziazioni, elementi attivi e dettagli grafici.
* `--ink`: Colore scuro ad alto contrasto per la tipografia principale, evitando il nero puro (`#000000`) per ridurre l'affaticamento visivo.
* `--cream`: Tinta calda di sfondo utilizzata nelle sezioni secondarie per spezzare il bianco puro.
* `--line`: Tonalità neutra per i bordi di separazione e la delimitazione dei contenuti.

#### 2.3.2 Tipografia Fluida

Per garantire la massima leggibilità, la dimensione del testo dell'intestazione principale `<h1>` viene calcolata dinamicamente tramite la funzione matematica CSS `clamp()`:

$$
font\_size = \text{clamp}(3\text{rem}, 6\text{vw}, 5.2\text{rem})
$$

```css
h1 {
    font-size: clamp(3rem, 6vw, 5.2rem);
    margin: 0 0 18px;
}
```

* **Dimensione Minima (**$3\text{rem}$**):** Impedisce al testo di diventare troppo piccolo su schermi smartphone.
* **Dimensione Ideale (**$6\text{vw}$**):** Scala la tipografia in proporzione del $6\%$ rispetto alla larghezza del viewport corrente.
* **Dimensione Massima (**$5.2\text{rem}$**):** Fissa un limite massimo per evitare titoli sproporzionati su monitor desktop Ultra-Wide.

#### 2.3.3 Architettura del Layout: Flexbox e CSS Grid

1. **Header Sticky e Navigazione (Flexbox):**

   ```css
   header {
       height: 80px;
       padding: 0 7%;
       display: flex;
       align-items: center;
       justify-content: space-between;
       background: white;
       position: sticky;
       top: 0;
       z-index: 5;
       border-bottom: 1px solid #eee;
   }
   ```

   L'utilizzo di `position: sticky` con `top: 0` fissa la barra in cima alla pagina durante lo scorrimento, mantenendo costante l'accesso alla navigazione.

2. **Overlay Gradiente nelle Sezioni Hero:**
   Le immagini di copertina usano lo pseudo-elemento `:before` per applicare uno strato inscurente in sovrapposizione:

   ```css
   .pagehero:before {
       content: "";
       position: absolute;
       inset: 0;
       background: linear-gradient(90deg, #171511cc, #17151133);
   }
   ```

   L'effetto gradiente scuro garantisce che il contrasto cromatico del testo sovrastante (di colore bianco) soddisfi i criteri dell'accessibilità WCAG AA (rapporto di contrasto $> 4.5:1$).

3. **Griglie Responsive (CSS Grid):**
   Per le schede in evidenza (`.cards`), i valori aziendali (`.values`) e la galleria (`.gallery`), viene adoperata una griglia a 3 colonne:

   ```css
   .cards {
       display: grid;
       grid-template-columns: repeat(3, 1fr);
       gap: 24px;
       margin-top: 35px;
   }
   ```

   L'unità di misura `1fr` (fractional unit) distribuisce equamente lo spazio disponibile tra le colonne.

#### 2.3.4 Media Queries e Logica Responsive Breakpoint

L'adattamento del layout agli schermi di varie dimensioni avviene tramite due principali breakpoint:

1. **Breakpoint Tablet (**$W \le 800\text{px}$**):**

   ```css
   @media (max-width: 800px) {
       .toggle {
           display: block; /* Mostra il pulsante hamburger */
       }

       nav {
           display: none; /* Nasconde la barra di navigazione standard */
           position: absolute;
           top: 80px;
           left: 0;
           right: 0;
           background: white;
           padding: 20px 6%;
           flex-direction: column;
           align-items: stretch;
       }

       nav.open {
           display: flex; /* Mostra il menu verticale al click sul toggle */
       }

       .two {
           grid-template-columns: 1fr; /* Converte le sezioni a 2 colonne in 1 sola colonna */
       }

       .cards, .values, .gallery {
           grid-template-columns: 1fr 1fr; /* Riduce le griglie a 2 colonne */
       }
   }
   ```

2. **Breakpoint Smartphone (**$W \le 540\text{px}$**):**

   ```css
   @media (max-width: 540px) {
       .cards, .values, .gallery {
           grid-template-columns: 1fr; /* Colonna singola per schermi piccoli */
       }

       .menuhead, .banner {
           display: block;
       }

       form .formrow {
           grid-template-columns: 1fr !important; /* Forza i campi affiancati in verticale */
       }
   }
   ```

### 2.4 Spiegazione Dettagliata del JavaScript Native (`js/script.js`)

L'intero codice JavaScript è racchiuso in una funzione di callback legata all'evento `DOMContentLoaded`. Questo assicura che lo script operi su nodi DOM già formati:

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // Codice applicativo
});
```

Di seguito viene analizzata nel dettaglio ciascuna componente del file `script.js`.

#### 2.4.1 Gestione dell'Hamburger Menu (Mobile Toggle)

```javascript
const toggle = document.querySelector('.toggle');
const nav = document.querySelector('nav');

toggle?.addEventListener('click', () => {
    nav.classList.toggle('open');
});
```

* **`querySelector('.toggle')` / `querySelector('nav')`:** Vengono selezionati l'elemento del pulsante hamburger e il contenitore di navigazione.
* **Optional Chaining (`toggle?.`):** L'operatore `?.` verifica preventivamente l'esistenza del pulsante nel DOM prima di agganciare il listener per l'evento `click`. Se l'elemento `toggle` fosse per qualsiasi motivo `null`, il codice eviterà l'eccezione di runtime `TypeError: Cannot read properties of null`.
* **`nav.classList.toggle('open')`:** Aggiunge la classe `.open` se non è presente sul tag `<nav>`, oppure la rimuove se è già presente. Nel CSS, l'aggiunta di `.open` converte `display: none` in `display: flex`, mostrando o nascondendo il menu.

#### 2.4.2 Algoritmo di Filtraggio e Ricerca Combinata del Menù

Nella pagina del menù (`menu.html`), l'applicazione consente la ricerca combinata tramite pulsanti di categoria ed un input di testo dinamico.

```javascript
const buttons = document.querySelectorAll('.filters button');
const items = document.querySelectorAll('.menu-list article');
const search = document.querySelector('#search');

let filter = 'tutti';
```

##### Inizializzazione e Stato

* `buttons`: NodeList contenente tutti i bottoni delle categorie.
* `items`: NodeList contenente tutte le voci del menù (`<article data-cat="...">`).
* `search`: Elemento di input della ricerca testuale (`#search`).
* `filter`: Variabile di stato che memorizza la categoria attualmente selezionata (valore di default: `'tutti'`).

##### La Funzione `refresh()`

La logica centrale di filtraggio è racchiusa nella funzione `refresh()`:

```javascript
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
```

* **Normalizzazione della Stringa di Ricerca:**

  ```javascript
  const q = (search?.value || '').toLowerCase();
  ```

  Legge il valore digitato dall'utente nell'input `#search`. Se il campo è nullo o privo di valore, viene usata una stringa vuota `''`. Successivamente, la stringa viene convertita in minuscolo con `.toLowerCase()`, per garantire una ricerca *case-insensitive* (indipendente da maiuscole e minuscole).

* **Iterazione ed Espressione Logica di Visibilità:**
  Per ogni elemento `<article>` del menù (`items.forEach(i => ...)`), viene eseguito il metodo `classList.toggle('hidden', condition)`:

  * Se la `condition` si valuta a `true`, la classe `.hidden` viene **aggiunta** e l'elemento viene nascosto (`display: none !important`).
  * Se si valuta a `false`, la classe `.hidden` viene **rimossa** e l'elemento resta visibile.

  Analizziamo l'espressione booleana di visibilità:

  $$
  \text{Visibile} = (F_{\text{cat}} \lor F_{\text{all}}) \land S_{\text{query}}
  $$

  Dove:

  1. **Filtro Categoria (**$F_{\text{cat}} \lor F_{\text{all}}$**):** `(filter === 'tutti' || i.dataset.cat === filter)`
     Verifica se il filtro selezionato è impostato su `'tutti'` oppure se il valore dell'attributo `data-cat` dell'elemento coincide con la categoria selezionata (`filter`).

  2. **Filtro Ricerca Testuale (**$S_{\text{query}}$**):** `i.textContent.toLowerCase().includes(q)`
     Estrae tutto il testo presente nell'articolo (`i.textContent`), lo converte in minuscolo e controlla se include la sottostringa `q`.

  Invertendo l'espressione con l'operatore NOT `!`, l'elemento viene nascosto (classe `.hidden` applicata) se **non** soddisfa entrambe le condizioni simultaneamente.

##### Registrazione degli Event Listener per i Filtri e la Ricerca

```javascript
buttons.forEach(b => {
    b.addEventListener('click', () => {
        buttons.forEach(x => x.classList.remove('active'));

        b.classList.add('active');
        filter = b.dataset.filter;

        refresh();
    });
});

search?.addEventListener('input', refresh);
```

1. **Click sui Pulsanti Filtro:**
   * Quando un utente clicca su un pulsante `b`, lo script rimuove la classe `.active` da tutti i pulsanti della griglia (`buttons.forEach(x => x.classList.remove('active'))`).
   * Aggiunge la classe `.active` esclusivamente al pulsante cliccato.
   * Aggiorna lo stato della variabile `filter` con il valore presente nell'attributo `data-filter` del pulsante (`b.dataset.filter`).
   * Richiama la funzione `refresh()` per aggiornare l'interfaccia.

2. **Digitazione nell'Input di Ricerca:**
   * L'event listener `'input'` associato al campo `search` esegue la funzione `refresh()` ad ogni singolo carattere inserito, modificato o cancellato dall'utente, offrendo un riscontro visivo in tempo reale.

#### 2.4.3 Gestione Dinamica della Data Minima nel Form

Per prevenire l'inserimento di date di prenotazione antecedenti alla data odierna, lo script imposta dinamicamente l'attributo `min` sull'input `<input type="date" id="date">`:

```javascript
const date = document.querySelector('#date');

if (date) {
    const d = new Date();

    date.min = new Date(
        d - d.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);
}
```

##### Spiegazione dell'Algoritmo della Data

1. `const d = new Date()`: Istanzia un oggetto Data con l'ora esatta del sistema client.
2. `d.getTimezoneOffset()`: Ritorna la differenza in minuti tra il fuso orario locale ed il tempo UTC (ad esempio, per l'Italia GMT+1 / GMT+2 si ottiene un valore di $-60$ o $-120$ minuti).
3. `d - d.getTimezoneOffset() * 60000`: Moltiplicando l'offset in minuti per $60000$ (i millisecondi contenuti in un minuto), si ottiene l'offset espresso in millisecondi:

   $$
   \text{Offset}_{\text{ms}} = \text{Offset}_{\text{min}} \times 60000
   $$

   Sottraendo questo valore dal tempo epocale dell'oggetto `d`, si ottiene la data locale corretta evitando disallineamenti di fuso orario durante la conversione ISO.
4. `.toISOString()`: Riconverte la data nel formato ISO 8601 standardizzato (`YYYY-MM-DDTHH:mm:ss.sssZ`).
5. `.slice(0, 10)`: Estrae unicamente i primi 10 caratteri della stringa, ovvero la sottostringa nel formato `YYYY-MM-DD`.
6. `date.min = ...`: Assegna tale stringa all'attributo `min` del campo input, disabilitando le date passate nel selettore del browser.

#### 2.4.4 Gestione del Submit del Form di Prenotazione e Feedback Utente

```javascript
document.querySelector('#booking')?.addEventListener('submit', e => {
    e.preventDefault();

    const name = new FormData(e.target).get('name');

    document.querySelector('#message').textContent =
        `Grazie ${name}! Modulo compilato`;

    e.target.reset();
});
```

* **`e.preventDefault()`:** Intercetta l'evento standard di sottomissione del modulo (`submit`), impedendo al browser di ricaricare la pagina o effettuare una richiesta HTTP di tipo POST/GET tradizionale.
* **`new FormData(e.target)`:** L'API `FormData` legge il contenuto dei campi del modulo identificato da `e.target` (il form `#booking`). Mediante il metodo `.get('name')`, viene recuperato il valore inserito nel campo `<input name="name">`.
* **Aggiornamento del DOM per il Feedback:**

  ```javascript
  document.querySelector('#message').textContent = `Grazie ${name}! Modulo compilato`;
  ```

  Il testo dell'elemento con ID `#message` viene aggiornato dinamicamente inserendo il nome dell'utente. L'uso di `.textContent` garantisce la massima sicurezza, prevenendo vulnerabilità di tipo Cross-Site Scripting (XSS) poiché qualsiasi valore inserito dall'utente viene interpretato unicamente come testo semplice e mai come codice HTML.
* **`e.target.reset()`:** Ripristina lo stato iniziale di tutti i campi di input all'interno del form.

---

## 3. Gestione del Progetto, Workflow GitHub e Lavoro di Squadra

La riuscita dello sviluppo del sito web della Pizzeria Peperoncino è legato al coordinamento del lavoro di squadra tramite **GitHub**. Il progetto fa capo al repository ufficiale accessible all'indirizzo:  
`https://github.com/VincenzoAnnese/Pizzeria---tps.git`.

```
                  ┌────────────────────────┐
                  │    main (Stabile)      │
                  └───────────▲────────────┘
                              │  Pull Request (Code Review)
                  ┌───────────┴────────────┐
                  │         branch         |
                  └▲──────────────────────▲┘
                   │                      │
       ┌───────────┴──────────┐ ┌─────────┴────────────┐
       │  feature sviluppata  | |  feature sviluppata  |
       └──────────────────────┘ └──────────────────────┘
```

### 3.1 Repository Remoto e Modello di Branching (GitHub Flow)

Per permettere a più sviluppatori di lavorare contemporaneamente senza sovrascrivere il codice altrui, è stato adottato un modello di **GitHub Flow / Feature Branch Workflow**:

1. **Main Branch (`main`):**  
   Costituisce il ramo principale di produzione. Il codice presente su questo branch deve essere sempre stabile, testato e pronto per il deployment. Nessuno sviluppatore esegue direttamente commit sul branch `main`.

2. **Feature Branches :**  
   Ogni nuova funzionalità (ad esempio l'implementazione del layout CSS, il sistema di filtraggio del menù o l'integrazione del form di prenotazione) viene sviluppata su un branch isolato creato a partire dal ramo di sviluppo.

### 3.2 Strumenti di Comunicazione e Coordinamento su GitHub

#### 3.2.1 Pull Requests (PR) e Processo di Code Review

Prima di unire qualsiasi modifica nel branch primario, ogni sviluppatore è tenuto ad aprire una **Pull Request (PR)** da proprio branch verso `main` o `develop`.
Ogni PR è collegata a un proprio branch, l'utilità della creazione di un branch separato è collegata direttamente all'integrità del progetto intero, infatti seguendo questo metodo il branch principale rimaneva invariato fin quando il team leader non approvava le modifiche eliminando il branch  e inserendo i nuovi file/file modificati nel main.

Il processo di collaborazione su GitHub si articola nei seguenti passaggi:

1. **Apertura della PR:** Lo sviluppatore illustra sinteticamente le modifiche apportate e cita le Issue collegate, per ogni PR aperta è stato creato un nuovo branch nella quale venivano copiati i file presenti nel main branch e inseriti i file caricati dallo sviluppatore. 
2. **Review Tra Pari (Code Review):** Almeno un altro membro del team analizza il codice proposto direttamente nell'interfaccia di GitHub (sezione *Files Changed*). Vengono verificate:
   * Conformità alle convenzioni di stile del codice (indentazione, nomi delle classi CSS, variabili JS).
   * Assenza di regressioni sul layout o su altre pagine.
   * Corretta gestione dell'accessibilità e della reattività.
3. **Discussione e Revisione Inline:** Eventuali dubbi o richieste di correzione vengono sollevati tramite commenti contestuali sulle righe di codice.
4. **Merge ed Eliminazione del Branch:** Ottenuta l'approvazione, la PR viene fusa nel ramo primario tramite *Merge Commit*, ed il branch temporaneo di feature viene eliminato per mantenere pulito l'albero di Git.

## 4. Casi di Testing, Validazione e Conclusioni

### 4.1 Suite dei Test Case Funzionali ed Interfaccia

Al fine di certificare il corretto funzionamento dell'applicazione web, è stata definita ed eseguita una suite di test case coprendo i vari aspetti dell'interfaccia.

| ID Test | Componente / Modulo | Condizione Operativa (Input) | Risultato Atteso | Risultato Effettivo | Stato | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **TC-01** | Navigation Bar | Ridimensionamento schermo a $W = 375\text{px}$ (Mobile) e tap sull'icona `☰`. | Riconvertito menu standard in menu a comparsa verticale con aggiunta classe `.open`. | Il menu appare correttamente sovrapposto al contenuto. | **PASSED** | 
| **TC-02** | Filtro Categoria | Click sul bottone `Fritti` nella pagina `menu.html`. | Nascosti gli elementi non afferenti alla categoria `fritti`. Visualizzati solo Patatine e Arancini. | La lista aggiorna gli articoli mostrando esclusivamente i fritti. | **PASSED** | 
| **TC-03** | Ricerca Testuale | Inserimento della parola `"margherita"` nell'input `#search`. | Nascosti tutti gli articoli tranne la pizza Margherita. | Visualizzato solo l'articolo con la pizza Margherita. | **PASSED** | 
| **TC-04** | Ricerca Combinata | Selezione filtro `Dolci` e successiva digitazione della parola `"nutella"`. | Visualizzazione esclusiva della "Pizza alla Nutella". | Nascosti gli altri dolci (Tiramisù) ed il resto del menù. | **PASSED** | 
| **TC-05** | Form Date Limit | Selezione della data nel form `#booking` su `prenota.html`. | Impossibilità fisica di selezionare sul calendario una data precedente a quella di oggi. | Le date passate risultano grigie e non cliccabili. | **PASSED** | 
| **TC-06** | Submit Form | Compilazione dei campi obbligatori del form e click su `Invia richiesta`. | Blocco del ricaricamento pagina, comparsa messaggio di conferma personalizzato con il nome dell'utente e reset form. | Messaggio visibile in `#message` e form svuotato correttamente. | **PASSED** | 
| **TC-07** | Link Esterni | Click sulle icone social e su "Google Maps" nei Contatti. | Apertura della risorsa su una nuova scheda browser in modo sicuro (`target="_blank" rel="noopener"`). | Nuova scheda aperta mantenendo inalterata la pagina sorgente. | **PASSED** | 

### 4.2 Conclusioni e Roadmap di Sviluppo Futuro

#### Conclusioni

Il progetto per la **Pizzeria Peperoncino** ha raggiunto appieno tutti gli obiettivi fissati in fase di analisi. L'utilizzo combinato di HTML5 semantico, CSS3 (con variabili globali, layout Flexbox/Grid e funzioni tipografiche fluide) e JavaScript ha consentito la realizzazione di una web app performante, responsive, accessibile e facilmente manutenibile. La logica di filtraggio e gestione del form è risultata robusta ed esente da errori nelle fasi di collaudo, mentre il workflow GitHub ha garantito un'organizzazione pulita ed una collaborazione di squadra efficace.

#### Sviluppi Futuri

Per le future evoluzioni della piattaforma web si prospettano le seguenti estensioni:

1. **Integrazione con un'infrastruttura Backend (Node.js / Express):** Creazione di una API RESTful per salvare le prenotazioni su un database relazionale (es. PostgreSQL) e inviare un'email automatica di conferma al cliente tramite SMTP.
2. **Modulo Ordini Online per il Delivery/Asporto:** Sviluppo di un carrello spesa lato client (memorizzato temporaneamente in `localStorage`) per permettere ai clienti di ordinare pizze a domicilio.
3. **Pannello di Amministrazione Riservato (CMS):** Realizzazione di un'interfaccia protetta da autenticazione per consentire al personale del ristorante di aggiornare autonomamente i prezzi del menù e gli orari di apertura.