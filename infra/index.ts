import * as cloudflare from "@pulumi/cloudflare"

const zone = cloudflare.getZone({ filter: { name: "wortle.app" } })

// GitHub Pages A records for apex domain
// https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain
const ghPagesIps = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]

ghPagesIps.forEach((ip, i) => {
  new cloudflare.DnsRecord(`gh-pages-a-${i}`, {
    zoneId: zone.then((z) => z.zoneId),
    name: "@",
    type: "A",
    content: ip,
    ttl: 300,
    proxied: false,
  })
})
