# Stroke Brain scRNA-seq Atlas — Per-Dataset Trace

**Prepared for:** Dr. Rust Lab  
**Date:** 2026-04-29  
**Source files:** `stroke_scrna_master_inventory.xlsx` (INCLUDE_Datasets sheet), `stroke_scrna_data_audit_log.md`

---

## Atlas Summary

| Property | Value |
|----------|-------|
| INCLUDE datasets | 16 |
| Total atlas-usable cells | 619,356 |
| Species | 15 mouse (*Mus musculus*), 1 rat (*Rattus norvegicus*; GSE250245) |
| Assay | 12 scRNA-seq, 4 snRNA-seq |
| Stroke models | tMCAO (5), pMCAO (7), dMCAO (2), ICH (1), ET-1/L-NAME (1) |
| Sex | Male-only in 13 datasets; male + aged female in GSE225948; male + female in GSE244576; NR in GSE197341 and GSE300564 |
| Genetic background | C57BL/6 or C57BL/6J in 14 datasets; Sprague-Dawley (rat) in GSE250245; NR in GSE197341 and GSE300564 |

### Model breakdown

| Model | N | Datasets |
|-------|---|---------|
| tMCAO | 5 | GSE174574, GSE225948, GSE245386, GSE227651, GSE244576 |
| pMCAO | 7 | GSE234052, GSE300442, GSE276202, GSE300564, GSE250245, GSE233812, GSE233813 |
| dMCAO | 2 | GSE279666, GSE197341 |
| ICH | 1 | GSE146930 |
| ET-1/L-NAME | 1 | GSE250597 |

### Note on GSE275670 exclusion

GSE275670 (Kuwata/Yasuda 2025, *Stem Cell Reports*, PMID 41173004) was initially catalogued as an INCLUDE tMCAO dataset. During the reperfusion verification pass (2026-04-29), inspection of the GEO accession revealed that the deposited data is **Rattus norvegicus bulk RNAseq** (12 OPC samples, OPC-5per vs OPC-Con, hypoxia preconditioning experiment, Illumina MiSeq) — not mouse stroke scRNA-seq. The 106,905-cell mouse scRNA-seq atlas described in the paper is hosted on Broad Single Cell Portal (SCP3078) and is a **re-analysis of existing public datasets**, including GSE174574, GSE225948, and other accessions already in this atlas. Including SCP3078 would have introduced duplicate cells from datasets already counted through their original GEO deposits. GSE275670 was reclassified to EXCLUDE. The atlas total dropped from 726,261 to 619,356 cells and from 17 to 16 INCLUDE datasets. This catch is worth flagging explicitly: the GEO accession metadata did not match the paper's mouse scRNA-seq atlas, and the re-analysis product on Broad SCP was not primary data.

---

## Per-Dataset Sections

---

### GSE174574

**Citation:** Zheng, 2022, J Cereb Blood Flow Metab (PMID 34496660)  
**Stroke model:** tMCAO — transient filament occlusion, 60 min. Reperfusion verification: `VERIFIED_FROM_METHODS` (Zheng 2022 JCBFM methods: "60 min filament occlusion + reperfusion").  
**Tissue:** Ipsilateral hemisphere — Left cerebral hemisphere; whole ipsilateral hemisphere dissected; 3 MCAO + 3 sham mice.  
**Cell count used:** 58,528 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** No reclassifications. Model description updated during 2026-04-29 session to explicitly record "60 min occlusion then reperfusion" (previously implicit). Reperfusion time confirmed from primary methods. Timepoints: Sham, 24h post-reperfusion.  
**Prep status for harmonization:** Ready — processed object available on GEO; 17 annotated clusters including vascular subclusters; labels confirmed from paper figures.

---

### GSE234052

**Citation:** Buizza/Paul, 2023, Transl Stroke Res (PMID 37378751)  
**Stroke model:** pMCAO — permanent filament occlusion (filament not withdrawn). Reperfusion: not applicable.  
**Tissue:** Ipsilateral hemisphere — pericyte-focused dissection; 1h, 12h, 24h post-pMCAO timepoints.  
**Cell count used:** ~15,000 cells (paper-reported filtered count). GEO deposit is Cell Ranger **unfiltered** output (millions of barcodes); the paper-reported filtered count must be used.  
**Curation notes:** No reclassifications. Flagged during initial curation: GEO files are unfiltered MTX. Paper-reported count (~15,000) used as the atlas-usable figure. Previously downloaded to ephemeral `/workspace/` storage (now gone after machine timeout; must be re-downloaded).  
**Prep status for harmonization:** Needs EmptyDrops — GEO deposit is Cell Ranger unfiltered; apply EmptyDrops or SoupX before use, or use paper-reported filtered counts directly if authors can provide the filtered object.

---

### GSE225948

**Citation:** Garcia-Bonilla, 2024, Nat Immunol (PMID 38177281)  
**Stroke model:** tMCAO — transient filament occlusion + reperfusion. Reperfusion duration: `NR` (not verified). Reperfusion verification: `NOT_VERIFIED_PAYWALLED` — model type (tMCAO) confirmed from paper; occlusion duration could not be verified because the methods section is paywalled and not accessible via PMC or mirrors. Recommended action: request methods access via institutional library or contact Garcia-Bonilla lab.  
**Tissue:** Ipsilateral hemisphere (brain) + peripheral blood — FACS-enriched fractions: CD45hi (infiltrating leukocytes), Mg (microglia), EC (endothelial cells). Brain atlas = 55,268 cells; blood samples (51,709 cells) excluded from atlas count.  
**Cell count used:** 55,268 cells (brain samples only). Full GEO deposit contains 106,977 cells across brain + blood. Blood samples excluded because the atlas scope is brain tissue. **Correction applied 2026-04-29:** n_cells_atlas corrected from 106,977 to 55,268; confirmed by GEO metadata CSVs.  
**Curation notes:** Cell count correction (106,977 → 55,268) applied after GEO metadata review confirmed blood samples account for 51,709 cells. Aged female mice included (young adult + aged cohorts); age group should be tracked as a covariate in integration. FACS enrichment means parenchymal neurons, astrocytes, and OPCs are absent by design — this is expected, not a data quality issue. Young cohort: 4 replicates per timepoint; aged cohort: unequal replication (2 Sham, 3 D2, 1 D14) by experimental design. Per-cell GEO metadata CSVs confirmed for all 18 brain samples (GSM7060815–GSM7060832); this is the only dataset with real per-cell labels in the unified metadata table.  
**Prep status for harmonization:** Ready — processed object available on GEO with confirmed per-cell metadata. Flag: FACS-enriched (no parenchymal cells); aged female cohort requires covariate tracking; reperfusion duration unverified.

---

### GSE250597

**Citation:** Loan, 2024, Theranostics (PMID 39431007)  
**Stroke model:** ET-1/L-NAME cortical ischemia (not filament MCAO). Reperfusion: not applicable (ET-1/L-NAME model does not use filament occlusion).  
**Tissue:** Sensory-motor cortex — FACS-sorted pericyte lineage-traced cells (NG2-CreERT2/Ai14 + Tbx18-CreERT2/Ai14); D3 post-ET-1/L-NAME.  
**Cell count used:** 22,025 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** Timepoints corrected during 2026-04-23 session from "Naive, Non-stroke, Stroke" to "Naive, Physical injury (D3), Ischemic stroke (D3 post-ET-1/L-NAME)" based on Fig 1A timeline. FACS-sorted pericyte lineage cells: non-pericyte populations are minor by sort design (NG2+ and Tbx18+ lineage-traced cells only). Vascular tier note: FACS enrichment for pericyte lineage means this dataset is pericyte-lineage-enriched, not a whole-brain dissociation.  
**Prep status for harmonization:** Ready — processed object available on GEO. Flag: PERICYTE-LINEAGE-ENRICHED (NG2-CreERT2/Ai14 + Tbx18-CreERT2/Ai14 fate-mapped cells); non-pericyte populations are minor; ET-1/L-NAME model differs mechanistically from filament MCAO.

---

### GSE146930

**Citation:** Bernier, 2025, Nat Neurosci (PMID 39962273)  
**Stroke model:** ICH — intracerebral hemorrhage (collagenase injection); pericyte/fibroblast fate-tracking via Hic1-CreERT2. Reperfusion: not applicable.  
**Tissue:** Infarct + peri-infarct cortex — collagenase ICH model; Hic1-CreERT2 fate-tracking of pericytes and perivascular fibroblasts.  
**Cell count used:** 3,503 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** No reclassifications. Smallest dataset in the atlas (3,503 cells); high vascular relevance (pericyte + perivascular fibroblast focus) but may have limited statistical power in integration. Exact post-ICH collection timepoint not specified in abstract; see paper methods for precise timing. ICH model (collagenase injection) is mechanistically distinct from all other atlas models (filament MCAO, dMCAO, ET-1/L-NAME).  
**Prep status for harmonization:** Ready — processed object available on GEO. Flag: small dataset (3,503 cells); ICH model distinct from ischemic stroke models; exact timepoint requires paper methods verification.

---

### GSE300442

**Citation:** Shabanzadeh, 2025, Nat Cardiovasc Res (PMID 40858841)  
**Stroke model:** pMCAO — permanent focal ischemia; SKI-1 inhibitor treatment study. Reperfusion: not applicable.  
**Tissue:** Peri-infarct cortex — FACS-sorted CD31+/CD45− brain endothelial cells only (EC-enriched); no parenchymal cells present by sort design.  
**Cell count used:** 17,116 cells (vehicle/IgG arm only). Treatment arm (SKI-1 inhibitor) excluded; only vehicle/IgG control arm used for atlas.  
**Curation notes:** **Scope decision 2026-04-29:** Dataset was ON HOLD pending scope decision (EC-only FACS sort). Decision: INCLUDE with `EC_ENRICHED` flag. Rationale: FACS-sorted CD31+/CD45− brain ECs provide high-quality EC subtype resolution (arterial, capillary, venule, large vein subtypes from paper Fig 1d); EC-enriched scope accepted for atlas. PMID confirmed as 40858841 during 2026-04-29 session. Ontology flag changed from `ON_HOLD_EC_ONLY` → `EC_ENRICHED`.  
**Prep status for harmonization:** Ready — processed object available on GEO. Flag: EC_ENRICHED (FACS-sorted CD31+/CD45−; no parenchymal cells); use vehicle/IgG arm only; EC subtype composition will differ from whole-brain datasets.

---

### GSE245386

**Citation:** Ruan, 2023, J Neuroinflammation (PMID 38037097)  
**Stroke model:** tMCAO — transient filament occlusion, 60 min. Reperfusion verification: `VERIFIED_FROM_METHODS` (Ruan/Lv 2023 J Neuroinflammation methods: "After 1 h of occlusion, the nylon monofilm was withdrawn").  
**Tissue:** Ipsilateral hemisphere — right hemisphere (ipsilateral); whole hemisphere dissected; WT + Lrg1 KO mice.  
**Cell count used:** 60,202 cells (WT samples only; full GEO deposit = 155,804 cells). Lrg1 KO arms excluded; only WT sham (n=3) + WT MCAO/R (n=2) samples used. **Known gap:** WTM3 sample is missing from GEO (only 2 WT MCAO samples available, not 3 as reported in paper).  
**Curation notes:** Timepoints corrected during 2026-04-29 session from "Acute (1h reperfusion)" to "1h occlusion + reperfusion (24h assessed); sham". Model description updated to explicitly record "1h occlusion then filament withdrawn; right hemisphere collected". Reperfusion time confirmed from primary methods. Subsetting decision (WT-only) documented; full GEO count (155,804) vs atlas-usable count (60,202) discrepancy explained by KO arm exclusion. Previously downloaded to ephemeral `/workspace/` storage (now gone; must be re-downloaded).  
**Prep status for harmonization:** Ready (data available on GEO; filtered MTX). Flag: WT-only subset (60,202 of 155,804 cells); WTM3 sample missing from GEO (n=2 WT MCAO instead of n=3); re-download required (ephemeral storage cleared).

---

### GSE279666

**Citation:** Ikegami, 2025, Neurochem Int (PMID 41223896)  
**Stroke model:** dMCAO — distal MCAO (permanent, no reperfusion). Reperfusion: not applicable.  
**Tissue:** Ipsilateral cortex — distal MCAO; snRNA-seq; D3 + D14 timepoints plus healthy and sham controls.  
**Cell count used:** 25,483 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** PMID confirmed as 41223896 (Ikegami/Sasaki, Osaka University) during 2026-04-29 session. Cell types confirmed from GEO series summary: glutamatergic neurons, GABAergic neurons, fibroblast-like cells, astrocytes, OPCs, oligodendrocytes, microglia, endothelial cells, pericytes. Companion scRNA-seq accession GSE279665 excluded (FACS-sorted Sytox-negative cells from PDGFRa-EGFP mice; physiological brain only; only 384 cells/sample = 2,304 total; no stroke model). Longitudinal design (Healthy, Sham, D3, D14) is a strength for trajectory analysis.  
**Prep status for harmonization:** Ready — processed object available on GEO.

---

### GSE276202

**Citation:** Weber/Rust, 2025, J Neuroinflammation (PMID 40251566)  
**Stroke model:** pMCAO — permanent focal ischemia (distal MCA ligation). Reperfusion: not applicable.  
**Tissue:** Stroke core + peri-infarct — distinct regions dissected separately; 1 month post-stroke repair phase. Contralateral hemisphere used as control.  
**Cell count used:** 24,150 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** Dr. Rust lab dataset. Region-specific dissection (stroke core vs peri-infarct vs contralateral) is a key design feature for spatial analysis. Cell type labels are inferred from tier classification; annotated h5ad likely available directly from PI — recommend requesting before integration to avoid re-annotation from scratch. Repair phase (1 month) is the latest chronic timepoint in the atlas.  
**Prep status for harmonization:** Needs re-annotation — labels inferred; request annotated h5ad from Dr. Rust directly before integration.

---

### GSE300564

**Citation:** Zera/Buckwalter, 2025, unpublished (no PMID; Stanford, Buckwalter lab)  
**Stroke model:** pMCAO — cortical stroke; chronic phase. Reperfusion: not applicable.  
**Tissue:** Infarct core + surrounding peri-infarct cortex — chronic phase; 10-month-old mice (aged model).  
**Cell count used:** 15,544 cells (isotype control arm only). Anti-VCAM1 and anti-VLA4 treatment arms excluded; only isotype control arm used for atlas. GEO title: "Blockade of VCAM1 or VLA4 preserves cerebrovasculature and prevents cognitive decline late after stroke."  
**Curation notes:** Unpublished as of GEO submission (June 2025). No published paper to cross-reference for cell type labels. 10-month-old mice represent an aged model — distinct from the young adult mice in most other atlas datasets. Genetic background NR. Requires full re-annotation from scratch (no existing labels).  
**Prep status for harmonization:** Needs re-annotation — unpublished dataset with no existing cell type labels; full re-annotation from raw counts required. Flag: aged mice (10 months); isotype arm only; no published paper.

---

### GSE197341

**Citation:** Nakamura/Hayakawa, 2026, Cell Rep (PMID 41456275; epub Dec 2025)  
**Stroke model:** dMCAO — distal MCAO (permanent). Reperfusion: not applicable.  
**Tissue:** Cerebral cortex (ipsilateral) — D3, D7, D14, D28 + sham; leptomeningeal vascular repair focus. MGH/Harvard + Tabaka lab.  
**Cell count used:** 107,020 cells. No subsetting; all cells from GEO processed object used. Largest single dataset in the atlas.  
**Curation notes:** No reclassifications. GEO metadata contains timepoint information only — no cell type column. Cell type labels must be extracted from paper Fig 1 UMAP and verified against count matrices after download. Sex and age NR (not reported in abstract). Longitudinal design (Sham, D3, D7, D14, D28) covers the full subacute-to-chronic window and is the most temporally resolved dataset in the atlas.  
**Prep status for harmonization:** Needs re-annotation — GEO metadata has timepoint info only; no cell type column; labels require matrix download and verification against paper Fig 1 UMAP.

---

### GSE227651

**Citation:** Zeng, 2023, Front Immunol (PMID 37063847)  
**Stroke model:** tMCAO — transient filament occlusion, **90 min**. Reperfusion verification: `VERIFIED_FROM_METHODS` (Zeng 2023 Front Immunol methods: *"After the monofilament was inserted for 1.5 hours of ischemia, the monofilament was gently pulled out"* — exact quote).  
**Tissue:** Ipsilateral hemisphere — whole hemisphere; D1, D3, D7 + sham; microglia focus.  
**Cell count used:** 59,429 cells. No subsetting; all cells from GEO processed object used.  
**Curation notes:** **Reperfusion time corrected 2026-04-29:** duration changed from 60 min (assumed) to **90 min** (verified from primary methods). This is a meaningful correction — 90 min occlusion produces larger infarcts and more severe injury than 60 min in C57BL/6 mice. Model description updated to record "90 min occlusion then reperfusion." Cell type labels require verification against count matrices (MEDIUM confidence; paper Fig 1 UMAP annotation).  
**Prep status for harmonization:** Ready — processed object available on GEO. Flag: 90 min occlusion (not 60 min); reperfusion duration corrected from prior assumption; labels require matrix verification.

---

### GSE250245

**Citation:** Bormann, 2024, Nat Commun (PMID 39043661)  
**Stroke model:** pMCAO — permanent MCAO in rat (filament not withdrawn); 48h post-MCAO. Reperfusion: not applicable.  
**Tissue:** Coronal sections between Bregma AP +1.5 mm and −2 mm (region of maximum ischemic lesion); hemispheres separated; rat model (*Rattus norvegicus*, Sprague-Dawley).  
**Cell count used:** 73,826 cells. No subsetting; all cells from GEO processed object used. Note: paper reports 68,616 nuclei; GEO-deposited count is 73,826 (includes all barcodes passing QC).  
**Curation notes:** **Two corrections applied:**  
1. **Stroke model corrected 2026-04-29:** changed from tMCAO → **pMCAO**. Paper methods explicitly state "permanent occlusion of the MCA"; filament not withdrawn. Previously misclassified as tMCAO.  
2. **PMID corrected 2026-04-29:** changed from 38378571 (wrong) → **39043661** (Bormann 2024, Nat Commun). Organism confirmed as *Rattus norvegicus* (rat) — the only non-mouse dataset in the atlas.  
**Ambiguous clusters requiring resolution before integration:**  
- **EP_M_C cluster:** Ependymal cells + mural cells (pericytes + vSMC) combined in one cluster. Cannot assign to a single canonical type without re-clustering. Use Foxj1/Ccdc153 (ependymal) vs Pdgfrb/Rgs5 (pericyte) vs Acta2/Myh11 (vSMC) markers.  
- **SAMC cluster (stroke-associated myeloid cells):** Contains both resident microglia (P2ry12+/Tmem119+) and infiltrating macrophages (Ccr2+/Ly6c+) per Bormann 2024. Cannot assign to `microglia` alone without sub-clustering.  
Cross-species gene mapping required before integration with mouse datasets.  
**Prep status for harmonization:** Needs re-clustering — EP_M_C and SAMC clusters are ambiguous and require sub-clustering before canonical cell type assignment. Also requires cross-species gene symbol mapping (rat → mouse orthologues) before integration.

---

### GSE233812

**Citation:** Zucha/Valihrach, 2024, PNAS (PMID 39499634)  
**Stroke model:** pMCAO — permanent MCAO; spatiotemporal atlas (scRNA-seq arm of GSE233815). Reperfusion: not applicable.  
**Tissue:** Cortex — coronal cryosections from bregma −1.3 ± 0.1 mm; scRNA-seq arm of spatiotemporal atlas; Sham, D1, D3, D7.  
**Cell count used:** ~25,000 cells (paper-reported filtered count). GEO deposit is Cell Ranger **unfiltered** output; paper-reported filtered count used.  
**Curation notes:** Paired with GSE233813 (snRNA-seq arm of the same spatiotemporal atlas, same paper). GEO files are unfiltered MTX — ambient RNA removal required before use. Previously downloaded to ephemeral `/workspace/` storage (now gone; must be re-downloaded). Labels require verification against count matrices after filtering (MEDIUM confidence; paper Fig 2 UMAP annotation).  
**Prep status for harmonization:** Needs EmptyDrops — GEO deposit is Cell Ranger unfiltered; apply EmptyDrops or SoupX before use. Re-download required (ephemeral storage cleared). Labels require matrix verification after filtering.

---

### GSE233813

**Citation:** Zucha/Valihrach, 2024, PNAS (PMID 39499634)  
**Stroke model:** pMCAO — permanent MCAO; spatiotemporal atlas (snRNA-seq arm of GSE233815). Reperfusion: not applicable.  
**Tissue:** Cortex — coronal cryosections from bregma −1.3 ± 0.1 mm; snRNA-seq arm of spatiotemporal atlas; Sham, D1, D3, D7.  
**Cell count used:** ~25,000 cells (paper-reported filtered count). GEO deposit is Cell Ranger **unfiltered** output; paper-reported filtered count used.  
**Curation notes:** Paired with GSE233812 (scRNA-seq arm of the same spatiotemporal atlas, same paper, same PMID 39499634). GEO files are unfiltered MTX — ambient RNA removal required before use. Previously downloaded to ephemeral `/workspace/` storage (now gone; must be re-downloaded). Labels require verification against count matrices after filtering (MEDIUM confidence; paper Fig 2 UMAP annotation). Note: GSE233812 and GSE233813 are complementary modalities from the same experiment; consider whether to integrate both or use one as a reference.  
**Prep status for harmonization:** Needs EmptyDrops — GEO deposit is Cell Ranger unfiltered; apply EmptyDrops or SoupX before use. Re-download required (ephemeral storage cleared). Labels require matrix verification after filtering.

---

### GSE244576

**Citation:** Zhang, 2025, Transl Stroke Res (no PMID; DOI 10.1007/s12975-025-01329-1)  
**Stroke model:** tMCAO — transient filament occlusion, **90 min**. Reperfusion verification: `VERIFIED_FROM_METHODS` (Zhang 2025 Transl Stroke Res preprint methods: *"After 90 min of induced ischemia, the monofilament was removed to allow for reperfusion"* — exact quote from ResearchSquare preprint).  
**Tissue:** Ipsilateral hemisphere — 72h post-tMCAO; vehicle + sham arms only.  
**Cell count used:** 32,262 cells (vehicle + sham arms only; full GEO deposit = 63,388 cells). QO-83 drug treatment arm excluded. Samples used: GSM7820719 (sham), GSM7820720 and GSM7820721 (vehicle tMCAO).  
**Curation notes:** **Reperfusion time corrected 2026-04-29:** duration changed from 60 min (assumed) to **90 min** (verified from ResearchSquare preprint methods). Published paper methods were inaccessible (Springer paywall); preprint used as fallback source. Model description updated to record "90 min occlusion then reperfusion." Subsetting decision (vehicle + sham only) documented; QO-83 treatment arm excluded to avoid drug confound. Previously downloaded to ephemeral `/workspace/` storage (now gone; must be re-downloaded). Labels inferred from tier classification (MEDIUM confidence); require matrix verification.  
**Prep status for harmonization:** Ready (filtered MTX available on GEO). Flag: 90 min occlusion (not 60 min); reperfusion duration corrected from prior assumption; vehicle + sham subset only (32,262 of 63,388 cells); re-download required (ephemeral storage cleared); labels require matrix verification.

---

## Harmonization Readiness Summary

| Accession | First Author | Model | Cells | Status |
|-----------|-------------|-------|-------|--------|
| GSE174574 | Zheng 2022 | tMCAO 60 min | 58,528 | Ready |
| GSE234052 | Buizza/Paul 2023 | pMCAO | ~15,000 | Needs EmptyDrops |
| GSE225948 | Garcia-Bonilla 2024 | tMCAO NR min | 55,268 | Ready (FACS-enriched; reperfusion duration unverified) |
| GSE250597 | Loan 2024 | ET-1/L-NAME | 22,025 | Ready (pericyte-lineage-enriched) |
| GSE146930 | Bernier 2025 | ICH | 3,503 | Ready |
| GSE300442 | Shabanzadeh 2025 | pMCAO | 17,116 | Ready (EC-enriched; vehicle arm only) |
| GSE245386 | Ruan 2023 | tMCAO 60 min | 60,202 | Ready (WT-only subset; re-download needed) |
| GSE279666 | Ikegami 2025 | dMCAO | 25,483 | Ready |
| GSE276202 | Weber/Rust 2025 | pMCAO | 24,150 | Needs re-annotation (request h5ad from PI) |
| GSE300564 | Zera/Buckwalter 2025 | pMCAO | 15,544 | Needs re-annotation (unpublished; no labels) |
| GSE197341 | Nakamura/Hayakawa 2026 | dMCAO | 107,020 | Needs re-annotation (no GEO cell type column) |
| GSE227651 | Zeng 2023 | tMCAO 90 min | 59,429 | Ready (labels need matrix verification) |
| GSE250245 | Bormann 2024 | pMCAO (rat) | 73,826 | Needs re-clustering (EP_M_C + SAMC ambiguous) + cross-species mapping |
| GSE233812 | Zucha/Valihrach 2024 | pMCAO | ~25,000 | Needs EmptyDrops + re-download |
| GSE233813 | Zucha/Valihrach 2024 | pMCAO | ~25,000 | Needs EmptyDrops + re-download |
| GSE244576 | Zhang 2025 | tMCAO 90 min | 32,262 | Ready (vehicle+sham subset; re-download needed) |

**Ready (6):** GSE174574, GSE225948, GSE250597, GSE146930, GSE300442, GSE279666  
**Ready with caveats (3):** GSE245386, GSE227651, GSE244576 (re-download needed; labels need verification)  
**Needs EmptyDrops (3):** GSE234052, GSE233812, GSE233813  
**Needs re-annotation (3):** GSE276202, GSE300564, GSE197341  
**Needs re-clustering + cross-species mapping (1):** GSE250245

---

*Document generated from `stroke_scrna_master_inventory.xlsx` (INCLUDE_Datasets sheet) and `stroke_scrna_data_audit_log.md`. All curation decisions traceable to audit log session entries dated 2026-04-23 and 2026-04-29.*
