const ENGLISH = "english";
        const GERMAN = "german";
        const FRENCH = "french";
        class Header {
            constructor(_name, _language, _isCriteria, _calculated,_refs, _formula) {
                this.name = _name;
                this.language = _language;
                this.isCriteria = _isCriteria;
                if(_calculated && !_isCriteria) {
                    this.calculated = true;
                    this.formula = _formula;
                    this.refs = _refs;
                } else {
                    this.calculated = false;
                }
            }

            calculate (available_headers, data) {
                var matches = new Array();
                var headersIndex;
                for(headersIndex = 0; headersIndex < this.refs.length; headersIndex++) {
                    var avIndex;
                    for (avIndex = 0; avIndex < available_headers.length; avIndex++) {
                        if(available_headers[avIndex].name === this.refs[headersIndex]) {
                            matches.push(available_headers[avIndex]);
                        }
                    }
                }
                var dataMatches = new Array();
                for (headersIndex = 0; headersIndex < matches.length; headersIndex++) {
                    dataMatches.push(data[available_headers.indexOf(matches[headersIndex])]);
                }
                return this.formula.apply(this, dataMatches);
            }
        }

        class EnglishHeader extends Header {
            constructor(_name, _isCriteria, _calculated,_refs, _formula) {
                super(_name, ENGLISH, _isCriteria, _calculated,_refs, _formula);
            }
        }

        class GermanHeader extends Header {
            constructor(_name, _isCriteria, _calculated,_refs, _formula) {
                super(_name, GERMAN, _isCriteria, _calculated,_refs, _formula);
            }
        }

        class FrenchHeader extends Header {
            constructor(_name, _isCriteria, _calculated,_refs, _formula) {
                super(_name, FRENCH, _isCriteria, _calculated,_refs, _formula);
            }
        }

        // TODO need to mark in_between arguments that are needed for calc but not in the end result
        const DEVICE_DE = new GermanHeader("Gerät", true, false, undefined, undefined);
        const GENDER_DE = new GermanHeader("Geschlecht", true, false, undefined, undefined);
        const REGION_DE = new GermanHeader("Region", true, false, undefined, undefined);
        const AGE_DE = new GermanHeader("Alter", true, false, undefined, undefined);
        const INTERESTS_DE = new GermanHeader("Interessen", true, false, undefined, undefined);
        const LOCATION_DE = new GermanHeader("Gebiet", true, false, undefined, undefined);
        const KEYWORD_DE = new GermanHeader("Keyword", true, false, undefined, undefined);
        const SPEND_DE = new GermanHeader("Ausgaben", false, false, undefined, undefined);
        const IMPRESSIONS_DE = new GermanHeader("Impressions insgesamt", false, false, undefined, undefined);
        const CLICKS_DE = new GermanHeader("Klicks (gesamt)", false, false, undefined, undefined);
        const ENGAGEMENTS_DE = new GermanHeader("Interaktionen insgesamt", false, false, undefined, undefined);
        const ER_DE = new GermanHeader("ER", false, true, [ENGAGEMENTS_DE.name, IMPRESSIONS_DE.name], (eng,impr) => eng/impr);
        const ECPM_DE = new GermanHeader("eCPM", false, true, [SPEND_DE.name, IMPRESSIONS_DE.name], (spend, impr) => (spend/impr)*1000);
        const ECTR_DE = new GermanHeader("eCTR", false, true, [CLICKS_DE.name, IMPRESSIONS_DE.name], (clicks, impr) => clicks/impr);
        const ECPC_DE = new GermanHeader("eCPC", false, true, [SPEND_DE.name, CLICKS_DE.name], (spend, clicks) => spend/clicks);

        const DE_AWARENESS = [DEVICE_DE, KEYWORD_DE, REGION_DE, LOCATION_DE, AGE_DE, INTERESTS_DE, GENDER_DE, SPEND_DE, IMPRESSIONS_DE, CLICKS_DE, ENGAGEMENTS_DE, ER_DE, ECPM_DE];
        const DE_TRAFFIC = [DEVICE_DE, KEYWORD_DE, REGION_DE, LOCATION_DE, AGE_DE, INTERESTS_DE, GENDER_DE, SPEND_DE, IMPRESSIONS_DE, CLICKS_DE, ECTR_DE, ECPC_DE];

        const DEVICE_EN = new EnglishHeader("Device", true, false, undefined, undefined);
        const GENDER_EN = new EnglishHeader("Gender", true, false, undefined, undefined);
        const REGION_EN = new EnglishHeader("Region", true, false, undefined, undefined);
        const AGE_EN = new EnglishHeader("Age", true, false, undefined, undefined);
        const INTERESTS_EN = new EnglishHeader("Interests", true, false, undefined, undefined);
        const METRO_EN = new EnglishHeader("Metro", true, false, undefined, undefined);
        const LOCATION_EN = new EnglishHeader("Location", true, false, undefined, undefined);
        const KEYWORD_EN = new EnglishHeader("Keyword", true, false, undefined, undefined);
        const SPEND_EN = new EnglishHeader("Spend", false, false, undefined, undefined);
        const IMPRESSIONS_EN = new EnglishHeader("Total impressions", false, false, undefined, undefined);
        const CLICKS_EN = new EnglishHeader("Total clicks", false, false, undefined, undefined);
        const ENGAGEMENTS_EN = new EnglishHeader("Total engagements", false, false, undefined, undefined);
        const ER_EN = new EnglishHeader("ER", false, true, [ENGAGEMENTS_EN.name, IMPRESSIONS_EN.name], (eng,impr) => eng/impr);
        const ECPM_EN = new EnglishHeader("eCPM", false, true, [SPEND_EN.name, IMPRESSIONS_EN.name], (spend, impr) => (spend/impr)*1000);
        const ECTR_EN = new EnglishHeader("eCTR", false, true, [CLICKS_EN.name, IMPRESSIONS_EN.name], (clicks, impr) => clicks/impr);
        const ECPC_EN = new EnglishHeader("eCPC", false, true, [SPEND_EN.name, CLICKS_EN.name], (spend, clicks) => spend/clicks);

        const EN_AWARENESS = [DEVICE_EN, KEYWORD_EN, REGION_EN, METRO_EN, LOCATION_EN, AGE_EN, INTERESTS_EN, GENDER_EN, SPEND_EN, IMPRESSIONS_EN, CLICKS_EN, ENGAGEMENTS_EN, ER_EN, ECPM_EN];
        const EN_TRAFFIC = [DEVICE_EN, KEYWORD_EN, REGION_EN, METRO_EN, LOCATION_EN, AGE_EN, INTERESTS_EN, GENDER_EN, SPEND_EN, IMPRESSIONS_EN, CLICKS_EN, ECTR_EN, ECPC_EN];

        const DEVICE_FR = new FrenchHeader("Appareil", true, false, undefined, undefined);
        const GENDER_FR = new FrenchHeader("Identité de genre", true, false, undefined, undefined);
        const REGION_FR = new FrenchHeader("Région", true, false, undefined, undefined);
        const AGE_FR = new FrenchHeader("Âge", true, false, undefined, undefined);
        const INTERESTS_FR = new FrenchHeader("Centres d'intérêt", true, false, undefined, undefined);
        const METRO_FR = new FrenchHeader("Agglomération", true, false, undefined, undefined);
        const LOCATION_FR = new FrenchHeader("Location", true, false, undefined, undefined);
        const KEYWORD_FR = new FrenchHeader("Mot-clé", true, false, undefined, undefined);
        const SPEND_FR = new FrenchHeader("Dépenses", false, false, undefined, undefined);
        const IMPRESSIONS_FR = new FrenchHeader("Nombre total d'impressions", false, false, undefined, undefined);
        const CLICKS_FR = new FrenchHeader("Nombre total de clics", false, false, undefined, undefined);
        const ENGAGEMENTS_FR = new FrenchHeader("Total des engagements", false, false, undefined, undefined);
        const ER_FR = new FrenchHeader("ER", false, true, [ENGAGEMENTS_FR.name, IMPRESSIONS_FR.name], (eng,impr) => eng/impr);
        const ECPM_FR = new FrenchHeader("eCPM", false, true, [SPEND_FR.name, IMPRESSIONS_FR.name], (spend, impr) => (spend/impr)*1000);
        const ECTR_FR = new FrenchHeader("eCTR", false, true, [CLICKS_FR.name, IMPRESSIONS_FR.name], (clicks, impr) => clicks/impr);
        const ECPC_FR = new FrenchHeader("eCPC", false, true, [SPEND_FR.name, CLICKS_FR.name], (spend, clicks) => spend/clicks);

        const FR_AWARENESS = [DEVICE_FR, KEYWORD_FR, REGION_FR, METRO_FR, LOCATION_FR, AGE_FR, INTERESTS_FR, GENDER_FR, SPEND_FR, IMPRESSIONS_FR, CLICKS_FR, ENGAGEMENTS_FR, ER_FR, ECPM_FR];
        const FR_TRAFFIC = [DEVICE_FR, KEYWORD_FR, REGION_FR, METRO_FR, LOCATION_FR, AGE_FR, INTERESTS_FR, GENDER_FR, SPEND_FR, IMPRESSIONS_FR, CLICKS_FR, ECTR_FR, ECPC_FR];


        const ONLY_FOR_CALCULATION = [ENGAGEMENTS_DE, ENGAGEMENTS_EN, ENGAGEMENTS_FR];
