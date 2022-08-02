export interface RawData {
    took:         number;
    timed_out:    boolean;
    _shards:      Shards;
    hits:         Hits;
    aggregations: Aggregations;
    min_score:    number;
    search:       any[];
}

export interface Shards {
    total:      number;
    successful: number;
    failed:     number;
}

export interface Aggregations {
    Type:             CategoryClass;
    "White Varietal": CategoryClass;
    Category:         CategoryClass;
    Price:            Price;
    Volume:           Price;
    Featured:         CategoryClass;
    Country:          CategoryClass;
    Style:            CategoryClass;
    "Red Varietal":   CategoryClass;
    "Type ":          CategoryClass;
    Other:            CategoryClass;
}

export interface CategoryClass {
    doc_count_error_upper_bound: number;
    sum_other_doc_count:         number;
    buckets:                     CategoryBucket[];
}

export interface CategoryBucket {
    key:       string;
    doc_count: number;
}

export interface Price {
    buckets: PriceBucket[];
}

export interface PriceBucket {
    key:             string;
    to?:             number;
    to_as_string?:   string;
    doc_count:       number;
    from?:           number;
    from_as_string?: string;
}

export interface Hits {
    total:       number;
    max_score:   number;
    hits:        Hit[];
    page:        string;
    total_pages: number;
    page_size:   string;
}

export interface Hit {
    _index:  Index;
    _type:   Type;
    _id:     string;
    _score:  number;
    _source: Source;
    sort:    string[];
}

export enum Index {
    Bcls = "bcls",
}

export interface Source {
    redVarietal:            RedVarietal | null;
    isVQA:                  boolean | null;
    subCategory:            ClassClass;
    consumerRating:         number;
    featured:               Featured[];
    _isLimitedTimeOffer:    boolean | null;
    regularPrice:           string;
    isCraft:                boolean | null;
    isDraft:                boolean | null;
    promotionStartDate:     Date | null;
    whiteVarietal:          WhiteVarietal | null;
    tastingDescription:     boolean | string;
    _promotionStartDate:    Date | null;
    _all_featured:          AllFeatured[];
    promotionEndDate:       Date | null;
    isBCSpirit:             null;
    sku:                    string;
    isLimitedTimeOffer:     boolean | null;
    _featured:              Featured[];
    image:                  string;
    availableUnits:         number;
    last_updated:           Date;
    subRegion:              null | string;
    unitSize:               number;
    upc:                    string[];
    _blacklist:             boolean;
    isDealcoholizedWine:    boolean | null;
    volume:                 string;
    certificates:           Certificate[];
    name:                   string;
    style:                  null | string;
    countryName:            CountryName;
    isBCCraft:              boolean;
    region:                 null | string;
    statusCode:             string;
    status:                 string;
    color:                  Color | null;
    grapeType:              null | string;
    _regularPrice:          string;
    isOrganic:              boolean | null;
    storeCount:             number | null;
    nameSuffix:             string;
    alcoholPercentage:      number;
    productCategory:        ProductCategory | null;
    isExclusive:            boolean;
    all_featured:           AllFeatured[];
    restrictionCode:        RestrictionCode;
    productSubCategory:     ProductSubCategory | null;
    namePrefix:             null | string;
    countryCode:            CountryCode;
    isOntarioVQA:           boolean | null;
    class:                  ClassClass;
    productType:            ProductType | null;
    isKosher:               boolean | null;
    _whitelist:             boolean;
    inventoryCode:          string;
    currentPrice:           string;
    sweetness:              null | string;
    isNew:                  boolean;
    all_promotions:         Promotion[] | null;
    promotions:             Promotion[] | null;
    nameSanitized:          string;
    isBCVQA:                boolean | null;
    _currentPrice:          string;
    _promotionEndDate:      Date | null;
    votes:                  number;
    category:               ClassClass;
    is_special_release?:    boolean;
    availability_override?: string;
}

export enum AllFeatured {
    BCLSelect = "BCL Select",
    BcVqa = "BC VQA",
    NewProduct = "New Product",
    OnSale = "On Sale",
}

export enum Featured {
    Bcls = "BCLS",
    MonthlyFlyer = "monthly flyer",
    New = "New",
    Provence = "provence",
    Rb = "RB",
    Summer2022 = "summer2022",
    Vqa = "vqa",
}

export interface Promotion {
    urlAlias:  URLAlias;
    name:      Name;
    promoCode: PromoCode;
    published: boolean;
    shortName: Featured;
}

export enum Name {
    BCLSelect = "BCL Select",
    BlushingProvenceRose = "Blushing Provence Rose",
    CelebrateSummer = "Celebrate Summer",
    FeaturedProducts = "Featured products",
    LightAndRefreshing = "Light and refreshing",
    NewForYou = "New for you",
}

export enum PromoCode {
    The2020Bclselect = "2020BCLSELECT",
    The2021Aprnew = "2021APRNEW",
    The2022Flyerjuly = "2022FLYERJULY",
    The2022Junesummer = "2022JUNESUMMER",
    The2022Marvqa = "2022MARVQA",
    The2022Provence = "2022PROVENCE",
    The2022Refreshbev = "2022REFRESHBEV",
}

export enum URLAlias {
    Promotion2022ProvenceWines = "/promotion/2022-provence-wines",
    Promotion2022RefreshmentBeverages = "/promotion/2022-refreshment-beverages",
    Promotion2022Summer = "/promotion/2022-summer",
    PromotionBcVqa = "/promotion/bc-vqa",
    PromotionBclSelect = "/promotion/bcl-select",
    PromotionMonthlyFlyer = "/promotion/monthly-flyer",
    PromotionNewArrivals = "/promotion/new-arrivals",
}

export interface ClassClass {
    description: string;
    id:          number;
}

export enum Certificate {
    AllVQA = "All VQA",
    BcVqa = "BC VQA",
    DeAlcoholizedWine = "De-Alcoholized Wine",
    Kosher = "Kosher",
    Organic = "Organic",
    VQAOntario = "VQA Ontario",
}

export enum Color {
    NotApplicable = "NOT APPLICABLE",
    Red = "RED",
    Rose = "ROSE",
    White = "WHITE",
}

export enum CountryCode {
    Ar = "AR",
    At = "AT",
    Au = "AU",
    Bb = "BB",
    Be = "BE",
    Bg = "BG",
    Br = "BR",
    CA = "CA",
    CN = "CN",
    Ch = "CH",
    Cl = "CL",
    Cu = "CU",
    Cz = "CZ",
    De = "DE",
    Dk = "DK",
    Do = "DO",
    Es = "ES",
    Fi = "FI",
    Fr = "FR",
    GB = "GB",
    Ge = "GE",
    Gr = "GR",
    Gt = "GT",
    Gy = "GY",
    Hr = "HR",
    Hu = "HU",
    IL = "IL",
    Ie = "IE",
    In = "IN",
    Is = "IS",
    It = "IT",
    Jm = "JM",
    Jp = "JP",
    Kr = "KR",
    LB = "LB",
    LV = "LV",
    Lu = "LU",
    MX = "MX",
    Ma = "MA",
    Me = "ME",
    NI = "NI",
    Nl = "NL",
    Nz = "NZ",
    PE = "PE",
    PR = "PR",
    Pa = "PA",
    Ph = "PH",
    Pl = "PL",
    Pt = "PT",
    Rs = "RS",
    SE = "SE",
    Sg = "SG",
    Sk = "SK",
    Th = "TH",
    Tr = "TR",
    Tt = "TT",
    Tw = "TW",
    Ua = "UA",
    Us = "US",
    Uy = "UY",
    Ve = "VE",
    Vi = "VI",
    Vn = "VN",
    Za = "ZA",
}

export enum CountryName {
    Argentina = "Argentina",
    Australia = "Australia",
    Austria = "Austria",
    Barbados = "Barbados",
    Belgium = "Belgium",
    Brazil = "Brazil",
    Bulgaria = "Bulgaria",
    Canada = "Canada",
    Chile = "Chile",
    China = "China",
    Croatia = "Croatia",
    Cuba = "Cuba",
    CzechRepublic = "Czech Republic",
    Denmark = "Denmark",
    DominicanRepublic = "Dominican Republic",
    Finland = "Finland",
    France = "France",
    Georgia = "Georgia",
    Germany = "Germany",
    Greece = "Greece",
    Guatemala = "Guatemala",
    Guyana = "Guyana",
    Hungary = "Hungary",
    Iceland = "Iceland",
    India = "India",
    Ireland = "Ireland",
    Israel = "Israel",
    Italy = "Italy",
    Jamaica = "Jamaica",
    Japan = "Japan",
    KoreaSouth = "Korea - South",
    Latvia = "Latvia",
    Lebanon = "Lebanon",
    Luxembourg = "Luxembourg",
    Mexico = "Mexico",
    Montenegro = "Montenegro",
    Morocco = "Morocco",
    Netherlands = "Netherlands",
    NewZealand = "New Zealand",
    Nicaragua = "Nicaragua",
    Panama = "Panama",
    Peru = "Peru",
    Philippines = "Philippines",
    Poland = "Poland",
    Portugal = "Portugal",
    PuertoRico = "Puerto Rico",
    Serbia = "Serbia",
    Singapore = "Singapore",
    SlovakRepublic = "Slovak Republic",
    SouthAfrica = "South Africa",
    Spain = "Spain",
    Sweden = "Sweden",
    Switzerland = "Switzerland",
    Taiwan = "Taiwan",
    Thailand = "Thailand",
    TrinidadAndTobago = "Trinidad And Tobago",
    Turkey = "Turkey",
    Ukraine = "Ukraine ",
    UnitedKingdom = "United Kingdom",
    Uruguay = "Uruguay",
    Usa = "USA",
    Venezuela = "Venezuela",
    Vietnam = "Vietnam",
    VirginIslands = "Virgin Islands",
}

export enum ProductCategory {
    DeAlcoholizedBeer = "De-Alcoholized Beer",
    DomesticBeer = "Domestic Beer",
    ImportBeer = "Import Beer",
}

export enum ProductSubCategory {
    BCCraftBeer = "BC Craft Beer",
    NationalDomesticBeer = "National Domestic Beer",
    OutsideOfBCBeer = "Outside of BC Beer",
}

export enum ProductType {
    Brandy = "Brandy",
    Cider = "Cider",
    Cognac = "Cognac",
    Coolers = "Coolers",
    DeAlcoholizedWine = "De-Alcoholized Wine",
    Gin = "Gin",
    IceWine = "Ice Wine",
    Liqueurs = "Liqueurs",
    OtherSpirits = "Other Spirits",
    OtherWine = "Other Wine",
    Port = "Port",
    RedWine = "Red Wine",
    RoseWine = "Rose Wine",
    Rum = "Rum",
    Sake = "Sake",
    Sherry = "Sherry",
    SparklingWine = "Sparkling Wine",
    Tequila = "Tequila",
    Vermouth = "Vermouth",
    Vodka = "Vodka",
    WhiskyWhiskey = "Whisky / Whiskey",
    WhiteWine = "White Wine",
}

export enum RedVarietal {
    Aglianico = "Aglianico",
    Barbera = "Barbera",
    BordeauxBlend = "Bordeaux Blend",
    CabernetBlend = "Cabernet Blend",
    CabernetCarmenere = "Cabernet / Carmenere",
    CabernetFranc = "Cabernet Franc",
    CabernetMalbec = "Cabernet / Malbec",
    CabernetMerlot = "Cabernet / Merlot",
    CabernetSauvignon = "Cabernet Sauvignon",
    CabernetShiraz = "Cabernet / Shiraz",
    Carmenere = "Carmenere",
    ChiantiBlend = "Chianti Blend",
    Corvina = "Corvina",
    Dolcetto = "Dolcetto",
    Gamay = "Gamay",
    GrenacheBlend = "Grenache Blend",
    GrenacheGarnacha = "Grenache / Garnacha",
    GrenacheShiraz = "Grenache / Shiraz",
    Malbec = "Malbec",
    Merlot = "Merlot",
    Montepulciano = "Montepulciano",
    MourvedreMataroMonastrell = "Mourvedre / Mataro / Monastrell",
    Nebbiolo = "Nebbiolo",
    Negroamaro = "Negroamaro",
    NeroDAvola = "Nero D'avola",
    OtherBlend = "Other Blend",
    OtherGrapeVariety = "Other Grape Variety",
    PetitVerdot = "Petit Verdot",
    PetiteSirah = "Petite Sirah",
    PinotNoir = "Pinot Noir",
    Pinotage = "Pinotage",
    Primitivo = "Primitivo",
    RhoneBlend = "Rhone Blend",
    RiojaBlend = "Rioja Blend",
    Sangiovese = "Sangiovese",
    ShirazBlend = "Shiraz Blend",
    ShirazMalbec = "Shiraz / Malbec",
    SyrahShiraz = "Syrah / Shiraz",
    Tannat = "Tannat",
    Tempranillo = "Tempranillo",
    TourigaNacional = "Touriga Nacional",
    ValpolicellaBlend = "Valpolicella Blend",
    Zinfandel = "Zinfandel",
}

export enum RestrictionCode {
    C = "C",
    G = "G",
    Sh = "SH",
    Sk = "SK",
    Sm = "SM",
    Sr = "SR",
    St = "ST",
    Su = "SU",
}

export enum WhiteVarietal {
    AlbarinoAlvarinho = "Albarino / Alvarinho",
    Auxerrois = "Auxerrois",
    BordeauxBlend = "Bordeaux Blend",
    Chardonnay = "Chardonnay",
    CheninBlanc = "Chenin Blanc",
    Ehrenfelser = "Ehrenfelser",
    Garganega = "Garganega",
    Gewurztraminer = "Gewurztraminer",
    GrunerVeltliner = "Gruner Veltliner",
    Marsanne = "Marsanne",
    MuscatMoscato = "Muscat / Moscato",
    OtherBlend = "Other Blend",
    OtherGrapeVariety = "Other Grape Variety",
    Pecorino = "Pecorino",
    PinotAuxerrois = "Pinot Auxerrois",
    PinotBlanc = "Pinot Blanc",
    PinotGrisPinotGrigio = "Pinot Gris / Pinot Grigio",
    RhoneBlend = "Rhone Blend",
    Riesling = "Riesling",
    SauvignonBlanc = "Sauvignon Blanc",
    SauvignonBlancSemillon = "Sauvignon Blanc / Semillon",
    Semillon = "Semillon",
    TojakiBlend = "Tojaki Blend",
    Torrontes = "Torrontes",
    Trebbiano = "Trebbiano",
    Verdejo = "Verdejo",
    Verdicchio = "Verdicchio",
    Vermentino = "Vermentino",
    Vidal = "Vidal",
    Viognier = "Viognier",
}

export enum Type {
    Product = "product",
}
