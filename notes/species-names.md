# Data Sources for Plant Species Verification

## 1. Plant Atlas 2020 (PA) - Names & URLs

**Source:** Zenodo dataset from BSBI
**URL:** https://zenodo.org/records/11093342
**File:** `PA2020_ConservationStatusData.zip` (154 KB)
**Extracted file used:** `nameLookup.csv`

### Key fields

| Field        | Description                                                           |
| ------------ | --------------------------------------------------------------------- |
| `ddbidOrig`  | URL identifier (e.g., `2cd4p9h.xbs`)                                  |
| `canonical`  | Scientific name without authority (used for matching)                 |
| `taxonName`  | Full scientific name (includes hybrid formulas for hybrids)           |
| `vernacular` | Common name                                                           |
| `qualifier`  | `s.s.` (sensu stricto) vs `s.l.` (sensu lato) - prefer `s.s.` entries |

### URL pattern

```
https://plantatlas2020.org/atlas/{ddbidOrig}
```

Example: https://plantatlas2020.org/atlas/2cd4p9h.xbs (Daisy)

### Gotchas

- Some species have duplicate entries (s.s. and s.l.) - prefer ones with `vernacular` populated
- Uses updated taxonomy (e.g., `Ficaria verna` not `Ranunculus ficaria`)
- For hybrids, `taxonName` shows formula (`Parent1 x Parent2 = Hybrid`), `canonical` shows just the hybrid name

---

## 2. WCVP (World Checklist of Vascular Plants) - Families

**Source:** Kew FTP server
**URL:** http://sftp.kew.org/pub/data-repositories/WCVP/wcvp.zip (100 MB)
**Extracted file used:** `wcvp_names.csv` (298 MB, pipe-delimited)

### Key fields

| Field          | Description                                   |
| -------------- | --------------------------------------------- |
| `taxon_name`   | Scientific name (used for matching)           |
| `family`       | Family name                                   |
| `taxon_status` | `Accepted` or `Synonym` - only use `Accepted` |
| `genus`        | Genus name                                    |
| `species`      | Species epithet                               |
| `taxon_rank`   | `Species`, `Subspecies`, `Variety`, etc.      |

### Gotchas

- **Pipe-delimited** (`|`), not comma-delimited
- Filter by `taxon_status == 'Accepted'`
- Uses different taxonomy to PA2020 in some cases (e.g., WCVP keeps `Ranunculus ficaria`, PA uses `Ficaria verna`)

---

## 3. Name Mappings Required

Some species needed mapping to updated/corrected names for lookup:

| Original                | PA2020 Name             | WCVP Name               | Notes               |
| ----------------------- | ----------------------- | ----------------------- | ------------------- |
| Ulex sp                 | Ulex europaeus          | Ulex europaeus          | Generic to specific |
| Campanula rotundiflora  | Campanula rotundifolia  | Campanula rotundifolia  | Typo fix            |
| Phyllitis scolopendrium | Asplenium scolopendrium | Asplenium scolopendrium | Reclassified        |
| Fallopia japonica       | Reynoutria japonica     | Reynoutria japonica     | Reclassified        |
| Ranunculus ficaria      | Ficaria verna           | Ranunculus ficaria      | PA/WCVP differ      |
| Potentilla palustris    | Comarum palustre        | Comarum palustre        | Reclassified        |
| Anagallis arvensis      | Lysimachia arvensis     | Lysimachia arvensis     | Reclassified        |
| Phragmites communis     | Phragmites australis    | Phragmites australis    | Updated name        |
| Potentilla anserina     | Potentilla anserina     | Argentina anserina      | WCVP reclassified   |

---

## 4. Example Python Code

### Loading PA2020 nameLookup.csv

```python
import csv

lookup = {}
with open('PA2020_ConservationStatusData/nameLookup.csv', 'r') as f:
    reader = csv.DictReader(f)
    for row in reader:
        canonical = row['canonical'].strip()
        # Prefer entries with vernacular names (s.s. over s.l.)
        if canonical not in lookup or row['vernacular'] != 'NA':
            lookup[canonical] = {
                'ddbid': row['ddbidOrig'],
                'vernacular': row['vernacular'] if row['vernacular'] != 'NA' else '',
                'taxonName': row['taxonName'],
            }

# Build URL
url = f"https://plantatlas2020.org/atlas/{lookup['Bellis perennis']['ddbid']}"
```

### Loading WCVP wcvp_names.csv

```python
import csv

families = {}
with open('wcvp_names.csv', 'r') as f:
    reader = csv.DictReader(f, delimiter='|')
    for row in reader:
        if row['taxon_status'] == 'Accepted':
            families[row['taxon_name']] = row['family']

# Lookup
family = families.get('Bellis perennis')  # Returns 'Asteraceae'
```

---

## 5. Download Commands

```bash
# PA2020 Conservation Status Data (includes nameLookup.csv)
curl -L -o PA2020_ConservationStatusData.zip \
  "https://zenodo.org/records/11093342/files/PA2020_ConservationStatusData.zip?download=1"
unzip PA2020_ConservationStatusData.zip

# WCVP (World Checklist of Vascular Plants)
curl -L -o wcvp.zip "http://sftp.kew.org/pub/data-repositories/WCVP/wcvp.zip"
unzip wcvp.zip
```
