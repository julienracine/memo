function ParserManpower()
{
    //console.log("instantiate Manpower");
}

ParserManpower.prototype = {

    logo: "manpower.png",
    name: "Manpower",

    //@RG - IMPORT : Les données importées des offres de MANPOWER sont nomCandidature, ville, descrition et email du contact (issues de la page HTML de l'offre).
    parse : function (html) {
        ga('send', {hitType: 'event', eventCategory: 'Candidature', eventAction: 'import', eventLabel: this.name });

        var t = this,
            c = new Candidature(),
            cont = document.createElement("div"),
            el, v = "", tmp;

        cont.innerHTML = html;
        cont = $(cont);
        debugCont = cont;

        c.jobBoard = this.name;

        // NomCandidature
        el = cont.find(".infos-lieu>h1");
        if (el && el.length)
            c.nomCandidature = el[0].innerHTML;
        
        // Ville
        el = cont.find(".infos-lieu>h2");
        if (el && el.length)
            c.ville = el.text().trim();

        // Description
        el = cont.find("#post-description");
        if(el.length > 0) {
        	c.description = el.html().trim();
        }

        // Email
        if (c.description) {
	        // tentative d'extraction d'email contact dans description -> chercher @
	        c.emailContact = getEmailInText(c.description);
        }
        
        return c;
    }
}