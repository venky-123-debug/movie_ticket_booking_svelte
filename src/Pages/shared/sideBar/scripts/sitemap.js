module.exports = {
  Movies: [{ title: "Movies", iconClasses: "fa-solid fa-chart-line", route: "#/Movies/AddNewMovie" }],
  "E-KYC-Search": [
    {
      title: "E-KYC-Search",
      iconClasses: "fa-solid fa-search",
      route: "#/E-KYC-Search/Global",
      subNavs: [
        { title: "Global", route: "#/E-KYC-Search/Global" },
        { title: "Bank", route: "#/E-KYC-Search/Bank" },
      ],
    },
  ],

  "Add New E-KYC": [{ title: "Add New E-KYC", iconClasses: "fa-solid fa-rectangle-history-circle-plus", route: "#/Add-New-kyc" }],
  Consent: [
    {
      title: "Consent",
      iconClasses: "fa-solid fa-bell",
      route: "#/Consent/Consent-List",
      subNavs: [
        { title: "Consent-List", route: "#/Consent/Consent-List" },
        { title: "Revocation-request", route: "#/Consent/Revocation-request" },
      ],
    },
  ],

  Relationship: [{ title: "Relationship", iconClasses: "fa-solid fa-handshake", route: "#/Relationship" }],

  Roles: [
    {
      title: "Roles",
      iconClasses: "fa-solid fa-plus",
      route: "#/Roles/Create-Role",
      subNavs: [
        { title: "Create-Role", route: "#/Roles/Create-Role" },
        { title: "User-List", route: "#/Roles/User-List" },
      ],
    },
  ],

  Statistics: [{ title: "Statistics", iconClasses: "fa-solid fa-chart-simple", route: "#/Statistics" }],
  Settings: [{ title: "Settings", iconClasses: "fa-solid fa-gear", route: "#/Settings" }],

  Logout: [{ title: "Logout", iconClasses: "fa-solid fa-left-from-bracket", route: "#/" }],
}
