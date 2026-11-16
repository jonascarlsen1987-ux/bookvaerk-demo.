# Site Favor – automatiseret kunde- og betalingsflow (intern teknisk plan)

## Besluttet af ejeren (16. november 2026)
- Markeder: Danmark, Tyskland, Polen, Sverige, Norge og Finland.
- Interfacesprog: dansk, engelsk, tysk, polsk, svensk, norsk og finsk.
- Dansk referencepris: **999 DKK i engangsoprettelse + 499 DKK pr. måned, ekskl. moms**.
- Inkluderet: opsætning af kundens hjemmeside, hosting og **aftalt almindelig månedlig vedligeholdelse**.
- Kunden skal kunne afprøve en AI-genereret hjemmeside **gratis før køb**.
- **Ingen betalingsopkrævning, før kunden har godkendt hjemmesiden og accepteret aftalen**. Engangsbeløb og første måneds abonnement kan først kræves ved denne godkendelse.
- Den præcise grænse for vedligeholdelse, support, rettelser, opsigelse, ejerskab, domæner, dataoverdragelse ved ophør og særskilte tilkøb kræver endelige kontraktvilkår.
- Internationale priser, valutaer og momsregler skal afklares pr. kundeland, herunder særskilt behandling af Norge.

## Status nu
- International brandforhåndsvisning: \`sitefavor-preview.html\`, med velkomstskærm og lokalt husket sprog.
- Gratis interaktiv skitse: \`sitefavor-builder-demo.html\`, på syv sprog. Den er en **skabelondemo uden AI**; brugerdata sendes ikke ved skitsedannelse.
- Eksisterende BookVærk-forespørgselsformular er baseret på \`mailto:\`; ingen automatisk indsamling endnu.
- Render er en statisk tjeneste; den kan ikke på egen hånd sende e-mail, kalde OpenAI API med hemmelige servernøgler, føre konti eller opkræve betaling.
- **Ikke klar:** Rigtig AI-generering, e-maillevering, betalingsintegration, kundegodkendelse, kundekonti, automatisk udgivelse.

## Foreslået produktionsarkitektur
1. **Gratis forhåndsvisning:** Anonym besøgende vælger sprog og beskriver virksomheden. En server-side AI-rute genererer et begrænset, faktuelt hjemmesideudkast som strukturerede data. Egen app gengiver udkastet i godkendelige temaer. Rate-limit, botkontrol, forbrugskvoter og dataminimering skal beskytte mod misbrug og uventede API-omkostninger.
2. **Valgfri kontakt/identifikation:** Kunden oplyser firmanavn, land, e-mail, eventuelt CVR-/momsnummer og ønsker. Bekræft e-mail, før personligt udkast eller redigeringslink sendes. Anvend et personligt link med udløb, ikke et almindeligt frit ChatGPT-link. Ingen passwords eller følsomme oplysninger i briefen.
3. **AI-ændringer og kundegodkendelse:** Gem versioner og vis ændringer. Kunde godkender én identificeret version. Oplysning om eventuelle spekulative priseksempler, billeder og SEO-tekster skal være tydelig; AI må ikke opfinde anmeldelser, certifikater, kundeeksempler eller garantier.
4. **Aftale og betaling:** Kunden læser og accepterer landespecifikke B2B-vilkår. Opret derefter en **Stripe Checkout-session på serveren** med engangslinje på 999 DKK + abonnementspris 499 DKK/måned for danske virksomheder. Ingen kortoplysninger gemmes i Site Favors egen kode. Betalingslink vises **først efter** godkendelse. Pris, moms, valuta og eventuelle betalte tredjepartsydelser vises på forhånd. Brug Stripe-hændelser (signaturkontrolleret webhook) til at markere betaling som gennemført; håndtér hændelser idempotent. Undgå at udgive på baggrund af kundens browser-redirect alene.
5. **Udgivelse:** Når godkendelse, vilkår og bekræftet første betaling foreligger, opretter systemet kundens isolerede site/deployment med entydigt navn, eget eller standarddomæne efter aftale og SSL. Sikkerhedstest og kontaktformular-test er obligatorisk. Implementér rollback af fejlslagen udgivelse.
6. **Månedlig vedligeholdelse:** Kunde kan indsende en rettelse i kontrolpanel. Ændringsagent kontrollerer rettigheder, rettelsens omfang, faktuelle oplysninger og regressionstester. For større opgaver sendes en særskilt aftale om tilkøb før udførelse. Driftsopgaver og status-/fejlalarmer logges. Betalingsfejl håndteres efter klare varsler og kundevilkår, ikke øjeblikkelig vilkårlig nedlukning.
7. **Drift og databeskyttelse:** Database, adgangsstyring, logning, backuper, backup-gendannelse, dataminimering og slettefrister. Databehandleraftaler for relevante leverandører. Landeforskelle i moms, oplysningstekster, fortrydelse/abonnementsregler og salg til virksomheder gennemgås inden aktivering.
8. **Fakturering og revision:** Gem godkendt hjemmesideversion, pris, aftalens version/tidspunkt, Stripe-kunde- og abonnements-ID samt faktura og opsigelsesstatus. Vis månedlige omsætningsberegninger som *scenarier* uden garanterede salgsresultater.

## Minimumskrav før betalende kunder
- [ ] Markeds- og varemærkekontrol for "Site Favor", samt registrering af egnet domæne.
- [ ] Afklaret dansk momsregistrering og behandling af kunder i de seks lande.
- [ ] Aftalt leverance, vedligeholdelsesscope, opsigelse, domæne/ejerskab og databehandlerroller.
- [ ] Backend/DB med adgangsstyring; sikker OpenAI API-nøgle på server (aldrig frontend eller GitHub-kode).
- [ ] Rigtig gratis AI-generering, validering og begrænsning af gratisforbrug.
- [ ] Kundelink og automatisk e-mail, med leveringstest og beskyttelse mod misbrug.
- [ ] Versioneret kundegodkendelse, aftaleaccept og aktiv Stripe-konto.
- [ ] Signeret betaling-webhook, udgivelse efter betaling, test og rollback.
- [ ] E-mail-/bookings-/vedligeholdelsesflow, tests og supportgrænser.
- [ ] Oversættelser og lokaliserede fakturaer/checkout testet af relevante sprogkyndige.

Denne fil er en **teknisk projektplan**, ikke en kontrakt, betalingsintegration eller juridisk vurdering. Udgiv ikke påstande om fuld AI-automatisering, før end-to-end-flowet er testet med rigtige systemer.
