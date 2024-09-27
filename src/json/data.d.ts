export interface Data {
    alcMillsPerDollar: number;
    category:          Category;
    id:                string;
    items:             number;
    name:              string;
    percent:           number;
    price:             number;
    stock:             number;
    subCategory:       SubCategory;
    value:             number;
    volume:            number;
}

export enum Category {
    Beer = "Beer",
    CoolersCiders = "Coolers & Ciders",
    GeneralMerchandise = "General Merchandise",
    Spirits = "Spirits",
    Wine = "Wine",
}

export enum SubCategory {
    ArgentinaWine = "Argentina Wine",
    AsianSpirits = "Asian Spirits",
    AustraliaWine = "Australia Wine",
    AustriaWine = "Austria Wine",
    BulgariaWine = "Bulgaria Wine",
    CanadaBC = "Canada - BC",
    CanadaOther = "Canada - Other",
    ChileWine = "Chile Wine",
    ChinaWine = "China Wine",
    Cider = "Cider",
    Coolers = "Coolers",
    DeAlcoholizedProduct = "De-Alcoholized Product",
    DomesticBCBeer = "Domestic - BC Beer",
    DomesticOtherProvinceBeer = "Domestic - Other Province Beer",
    FortifiedWine = "Fortified Wine",
    FranceWine = "France Wine",
    GeorgiaWine = "Georgia Wine",
    GermanyWine = "Germany Wine",
    Gin = "Gin",
    GrapeAndFruitBrandy = "Grape and Fruit Brandy",
    GreeceWine = "Greece Wine",
    HungaryWine = "Hungary Wine",
    ImportBeer = "Import Beer",
    IsraelWine = "Israel Wine",
    ItalyWine = "Italy Wine",
    Liqueurs = "Liqueurs",
    NewZealandWine = "New Zealand Wine",
    OtherCountryWine = "Other Country Wine",
    OtherSpirits = "Other Spirits",
    OtherStyleWine = "Other Style Wine",
    PortugalWine = "Portugal Wine",
    Rum = "Rum",
    Sake = "Sake",
    SouthAfricaWine = "South Africa Wine",
    SpainWine = "Spain Wine",
    Tequila = "Tequila",
    USAWine = "USA Wine",
    Vodka = "Vodka",
    Whisky = "Whisky",
}
