import * as cloudflare from "@pulumi/cloudflare"
import * as pulumi from "@pulumi/pulumi"

const config = new pulumi.Config()
const accountId = config.require("cloudflareAccountId")

const zone = await cloudflare.getZone({ filter: { name: "wortle.app" } })

// R2 bucket for public images (optimized, served via custom domain)
const imagesBucket = new cloudflare.R2Bucket("images", {
  accountId,
  name: "wortle-images",
})

// Public access via images.wortle.app
new cloudflare.R2CustomDomain("images-domain", {
  accountId,
  bucketName: imagesBucket.name,
  domain: "images.wortle.app",
  zoneId: zone.zoneId,
  enabled: true,
})

// R2 bucket for private originals (S3 API access only)
new cloudflare.R2Bucket("originals", {
  accountId,
  name: "wortle-originals",
})

// GitHub Pages A records for apex domain
// https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site#configuring-an-apex-domain
const ghPagesIps = ["185.199.108.153", "185.199.109.153", "185.199.110.153", "185.199.111.153"]

ghPagesIps.forEach((ip, i) => {
  new cloudflare.DnsRecord(`gh-pages-a-${i}`, {
    zoneId: zone.zoneId,
    name: "@",
    type: "A",
    content: ip,
    ttl: 300,
    proxied: false,
  })
})

// www subdomain CNAME for GitHub Pages
new cloudflare.DnsRecord("gh-pages-www", {
  zoneId: zone.zoneId,
  name: "www",
  type: "CNAME",
  content: "mdr.github.io",
  ttl: 300,
  proxied: false,
})
