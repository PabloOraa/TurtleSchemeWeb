class Media
{
    constructor(id,title,author, description, image, link, previewLink,year,runtime)
    {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.image = image;
        this.link = link;
        this.previewLink = previewLink;
        this.year = year;
        this.duration = runtime;
    }

    getTitle()
    {
        if(this.title.includes('('))
        {
            this.title = this.title.substr(0,this.title.indexOf('(')-1);
        }
        return this.title;
    }
}