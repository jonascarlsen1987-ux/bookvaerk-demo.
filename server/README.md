# Site Favor AI API — integrationsstatus

Denne kode er en **forberedelse**, ikke en klar produktions-AI eller betalingsløsning.

## Valgt system

OpenAI Responses API med JSON-schema for strukturerede hjemmesideudkast. Billig startmodel i test: `gpt-4o-mini` (kan senere ændres). Brugerens beskrivelse sendes til serveren *kun* når AI er aktiveret, og kunden aktivt klikker på generer.

- Node 20+: `node server/index.mjs` (ingen npm-pakker).
- Render gratis webservice: `sitefavor-ai-api-demo` i Frankfurt.
- `GET /api/health`: oplyser, om AI er aktiveret.
- `POST /api/preview`: kræver `Origin: https://sitefavor-demo.onrender.com`, JSON med `description`, `language`, `country`, `business_name`, `city`.
- De syv sprog og seks landekoder er whitelistet.
- OpenAI API-nøgle må **kun** indsættes i Render som hemmelig miljøvariabel, **aldrig** på frontend, i GitHub eller i chats.
- `SITEFAVOR_ENABLE_AI=false` er bevidst sat; backend returnerer 503 og ingen AI-omkostninger indtil aktivering.
- `SITEFAVOR_ALLOWED_ORIGIN=https://sitefavor-demo.onrender.com`.
- `SITEFAVOR_AI_MODEL=gpt-4o-mini`.
- `OPENAI_API_KEY` er endnu ikke konfigureret.
- Webfrontenden spørger først `/api/health`. Når AI ikke er aktiveret, forbliver den eksisterende **lokale skabelondemo**.
- Kortoplysninger eller abonnementer behandles **ikke** her.

## Krav før AI aktiveres for offentligheden

1. Aktivér OpenAI API-projekt med fakturering og læg API-nøgle ind i Render secrets.
2. Installer et **persistent** rate-limit og botbeskyttelse. Den nuværende in-memory-grænse på 5 kald/24 timer pr. forbindelses-IP er kun demonstrationsbeskyttelse og ikke egnet til offentlig drift eller belastning bag proxy.
3. Indfør pr. bruger-kvoter, budgetsikring, e-mail-verifikation, databeskyttelse, slettefrister, moderering og audit.
4. Udfør belastnings- og sikkerhedstest; opsæt daglige udgiftsalarmer og en grænse for API-forbrug.
5. Test alle syv sprog med rigtige ejerbeskrivelser. AI-output er et **udkast**, ikke verificerede virksomhedsoplysninger.
6. Først derefter kan `SITEFAVOR_ENABLE_AI=true` sættes på den server, der får lov til at behandle kundeoplysninger. Ingen kortbetaling eller automatisk udgivelse uden separat Stripe/DB/godkendelsesflow.

## Økonomi

Dansk pris: 499 kr. engangsoprettelse ekskl. moms, Basis 499 kr./md. eller planlagt Pro 699 kr./md. Begge abonnementer skal have tydelige AI-kvoter; et Pro-budget på 100 kr. er et internt *maksimalt forbrugsbudget*, **ikke** en fast licensbetaling til OpenAI. Valutaer på den offentlige preview er kun vejledende ECB-omregninger pr. 13/11-2026, ikke endelige priser.

## Fortsat manglende integration

- Kundekonti / identitetsbekræftelse
- Gemte og versionerede hjemmesideudkast
- Kundefremvisning, rettelser og accept af aftale
- Stripe fakturering, moms, sikre webhooks, tilbagebetalinger/opsigelse
- Automatisk udgivelse, individuel hosting, domæner og SSL
- Vedligeholdelse med kvoter og månedlige ændringsjobs

Siden og hele den registrerede virksomheds juridiske/privatlivsmæssige setup skal gennemgås, før aktiv kundesalg i Danmark, Tyskland, Polen, Sverige, Norge og Finland.
