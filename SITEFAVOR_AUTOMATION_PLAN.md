# Site Favor – automatiseret kunde- og betalingsflow (intern teknisk plan)

## Besluttet af ejeren (16. november 2026)
- Markeder: Danmark, Tyskland, Polen, Sverige, Norge og Finland.
- Interfacesprog: dansk, engelsk, tysk, polsk, svensk, norsk og finsk.
- Dansk referencepris: **499 DKK i engangsoprettelse + Basis 499 DKK pr. måned (eller planlagt Pro 699 DKK pr. måned), ekskl. moms**.
- Inkluderet: opsætning af kundens hjemmeside, hosting og **aftalt almindelig månedlig vedligeholdelse**.
- Kunden skal kunne afprøve en AI-genereret hjemmeside **gratis før køb**.
- **Ingen betalingsopkrævning, før kunden har godkendt hjemmesiden og accepteret aftalen**. Engangsbeløb og første måneds abonnement kan først kræves ved denne godkendelse.
- Den præcise grænse for vedligeholdelse, support, rettelser, opsigelse, ejerskab, domæner, dataoverdragelse ved ophør og særskilte tilkøb kræver endelige kontraktvilkår.
- Internationale priser, valutaer og momsregler skal afklares pr. kundeland, herunder særskilt behandling af Norge.

## Virksomhedsidentitet og bankstatus (16. november 2026)
- Registreret juridisk virksomhedsnavn: **dailywear.dk** (enkeltmandsvirksomhed).
- **CVR: 46827961**. Registreret adresse: **Albanivej 27B, st., 5792 Årslev, Danmark**.
- Offentlig kontakt til Site Favor: **jonascarlsen1987@live.dk**, **+45 42 25 31 25**.
- Same CVR/legal owner intended for **Dailywear.dk, XXXshoppen, Grejland og Site Favor** og eventuelle kommende webprojekter; brands er ikke hver for sig dokumenteret som selvstændige juridiske selskaber.
- Den danske momsregistrerings aktuelle status skal verificeres i Skattestyrelsens officielle register, før betalings-/fakturaflowet tages i brug; CVR-status og momsstatus er forskellige forhold.
- Revolut Business-sag **97213-31016-13811** sendt 16. november 2026: ønsket fælles erhvervskonto med **særskilt modtagekonto**, understøttelse af de fire forretninger, momsbetaling, internationale valutaer, og vurdering af dropshipping/voksenprodukter. Kun automatisk kvittering modtaget indtil videre. **Ingen bankkonto, Stripe, merchant-payout eller betalinger tilsluttes før Revoluts skriftlige afklaring og brugerens godkendelse.**
- Offentlig Site Favor-preview og builder viser juridisk navn/CVR/adresse/telefon/e-mail i footeren; den fælles privatlivstekst er udvidet til at dække Site Favors skitse og sprogvalg.

## Status nu
- International brandforhåndsvisning: \`sitefavor-preview.html\`, med velkomstskærm og lokalt husket sprog.
- Gratis interaktiv skitse: \`sitefavor-builder-demo.html\`, på syv sprog. Den er en **skabelondemo uden AI**; brugerdata sendes ikke ved skitsedannelse.
- Eksisterende Site Favor-forespørgselsformular er baseret på \`mailto:\`; ingen automatisk indsamling endnu.
- Render er en statisk tjeneste; den kan ikke på egen hånd sende e-mail, kalde OpenAI API med hemmelige servernøgler, føre konti eller opkræve betaling.
- **Ikke klar:** Rigtig AI-generering, e-maillevering, betalingsintegration, kundegodkendelse, kundekonti, automatisk udgivelse.

## Foreslået produktionsarkitektur
1. **Gratis forhåndsvisning:** Anonym besøgende vælger sprog og beskriver virksomheden. En server-side AI-rute genererer et begrænset, faktuelt hjemmesideudkast som strukturerede data. Egen app gengiver udkastet i godkendelige temaer. Rate-limit, botkontrol, forbrugskvoter og dataminimering skal beskytte mod misbrug og uventede API-omkostninger.
2. **Valgfri kontakt/identifikation:** Kunden oplyser firmanavn, land, e-mail, eventuelt CVR-/momsnummer og ønsker. Bekræft e-mail, før personligt udkast eller redigeringslink sendes. Anvend et personligt link med udløb, ikke et almindeligt frit ChatGPT-link. Ingen passwords eller følsomme oplysninger i briefen.
3. **AI-ændringer og kundegodkendelse:** Gem versioner og vis ændringer. Kunde godkender én identificeret version. Oplysning om eventuelle spekulative priseksempler, billeder og SEO-tekster skal være tydelig; AI må ikke opfinde anmeldelser, certifikater, kundeeksempler eller garantier.
4. **Aftale og betaling:** Kunden læser og accepterer landespecifikke B2B-vilkår. Opret derefter en **Stripe Checkout-session på serveren** med engangslinje på 499 DKK + abonnementspris 499 DKK/måned for danske virksomheder. Ingen kortoplysninger gemmes i Site Favors egen kode. Betalingslink vises **først efter** godkendelse. Pris, moms, valuta og eventuelle betalte tredjepartsydelser vises på forhånd. Brug Stripe-hændelser (signaturkontrolleret webhook) til at markere betaling som gennemført; håndtér hændelser idempotent. Undgå at udgive på baggrund af kundens browser-redirect alene.
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

## Forslag under drøftelse: abonnementspakker og AI-budget (16. november 2026)

**Bekræftet 16. november 2026:** Engangsoprettelsen er nedsat til 499 DKK ekskl. moms. Basis koster 499 DKK/måned; Pro til 699 DKK/måned er den planlagte pakkemodel og skal funktions- og budgettestes før salg.

| Forslået pakke | Månedspris ekskl. moms | Muligt AI-indhold | Foreslået AI-budget, ikke abonnementspris hos OpenAI |
|---|---:|---|---:|
| Basis | 499 DKK | Begrænset AI-hjælp + aftalt almindelig månedlig vedligeholdelse | Skal fastsættes efter pilotmåling, ikke 0 DKK i reel driftsomkostning |
| Pro | 699 DKK | Flere AI-redigeringer og forbedringsforslag | Op til 100 DKK API-budget/kunde/måned, ikke en fast ekstern Pro-licens |
| Business / Pro Plus (valgfri senere) | 899 DKK | Udvidet AI-adgang og prioriteret kapacitet | Større budget eller flere kvoter efter faktisk test |

- **ChatGPT Pro og OpenAI API er ikke det samme.** Der findes ikke automatisk et dedikeret Pro-abonnement til Site Favors kunder, som koster 100 DKK/måned. OpenAI API faktureres for faktisk brug af modeller og værktøjer; ChatGPT-abonnementer har særskilt fakturering.
- Kunden betaler den aftalte månedspris til Site Favor gennem en betalingsudbyder. Virksomheden betaler sin API-regning særskilt. Et internt budget på 100 DKK er ikke en automatisk direkte overførsel til OpenAI og ikke nødvendigvis et præcist udgiftsbeløb.
- I priseksempler med 100 DKK reelt AI-forbrug er tilbageværende omsætning fra 699 DKK = 599 DKK og fra 899 DKK = 799 DKK **før hosting, gebyrer, andre omkostninger og skat** (priser ekskl. moms). Dette er ikke overskud.
- Også Basis-kunder kan give AI-omkostninger, selv om AI-adgang er inkluderet uden særskilt tillægspris.
- Indfør kunde-/abonnements-ID, AI-kvote og forbrugsmåler med serverhåndhævet grænse. Reserver adgang til et antal klart definerede handlinger/credits i kontrakten; lov aldrig ubegrænset AI uden økonomiske grænser.
- Ved opbrugt kvote: vis status, lad kunden vente til næste faktureringsperiode eller køb et gennemsigtigt, godkendt tilvalg. Ingen uvarslede API-overforbrug må opkræves kunden automatisk.
- Afprøv virkelige AI-omkostninger pr. gratis skitse, hjemmesideproduktion og månedlig redigering, før Pro-kvote/pris offentliggøres.
- Internationalt: lokalisér pakkefunktioner, valuta og moms pr. land, når køb aktiveres. Det er ikke sikkert, at dansk pris kan bruges direkte alle steder.

## International lead generation – 16. november 2026
- Seks selvstændige, søgbare landingssider er oprettet på `sitefavor-demo.onrender.com`: `sitefavor-de.html`, `sitefavor-pl.html`, `sitefavor-sv.html`, `sitefavor-no.html`, `sitefavor-fi.html` og `sitefavor-en.html`. Dansk er forsiden `/`.
- De har unikke lokale titler/beskrivelser, separat URL, hreflang-alternativer, tydeligt demoforbehold, gratis skitse og en `mailto:`-henvendelse. Builder vælger sprog/land automatisk via URL-parametre.
- **Første mål:** 15 betalende kunder pr. måned ultimo 2026 (ejerens mål, ikke en prognose eller garanti). Mål særskilt besøg, reelle henvendelser, opfølgning og indgåede betalingsaftaler. Betaling og kontrakter først når bank, moms, vilkår, service og AI er klar.
- Internationale kanaler der skal vurderes med brugers godkendte udbyderkonto: Tyske Kleinanzeigen Dienstleistungen/Webdesign, polske Oferteo, tyske freelancermap og global Product Hunt. Opret ikke falske profiler eller automatiske massebeskeder.
- **Teknisk opmærksomhedspunkt:** Render-builden kopierer pt. `*.html *.css *.js robots.txt _headers`, men ikke `sitemap.xml`. XML-sitemap er opdateret i GitHub, men bliver ikke publiceret før build-kommandoen ændres eller en anden publiceringsmetode er valgt. Locale HTML-sider kan stadig findes via interne links/hreflang, uden garanti for indeksering. Search Console kræver ejerskabsbekræftelse.
