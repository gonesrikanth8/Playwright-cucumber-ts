# Environment Variables - Quick Reference

## 3 Variables You Can Use

### 1. HEADED - Browser Visibility
```bash
npm run test:headed          # Show browser (debug)
npm test                     # Hide browser (default - faster)
```

### 2. CUCUMBER_TAGS - Filter Tests by Tags
```bash
npm run test:tags                    # @smoke tests
CUCUMBER_TAGS="@critical" npm test   # @critical tests
CUCUMBER_TAGS="not @wip" npm test    # Exclude @wip tests
```

### 3. CUCUMBER_WORKERS - Parallel Execution
```bash
npm test                     # Serial (one at a time)
npm run test:parallel        # 4 workers (3-4x faster)
CUCUMBER_WORKERS=2 npm test  # 2 workers
```

---

## 8 Pre-Built npm Scripts

```bash
npm test                          # Default - headless, serial
npm run test:headed               # Headed, serial
npm run test:parallel             # Headless, 4 workers (FASTEST)
npm run test:parallel:headed      # Headed, 4 workers

npm run test:tags                 # @smoke, headless, serial
npm run test:tags:headed          # @smoke, headed, serial
npm run test:tags:parallel        # @smoke, headless, 4 workers
npm run test:tags:parallel:headed # @smoke, headed, 4 workers
```

---

## Examples

### Debug a Test (See Browser)
```bash
npm run test:headed
```

### Run Tests Fast (Parallel)
```bash
npm run test:parallel
```

### Run Specific Tests
```bash
CUCUMBER_TAGS="@critical" npm test
```

### Everything Combined
```bash
HEADED=true CUCUMBER_TAGS="@smoke" CUCUMBER_WORKERS=4 npm test
```

---

## Performance

- Serial: ~30 seconds
- Parallel (4 workers): ~8-10 seconds  
- **3-4x faster with parallel!** ⚡

---

## Tag Examples

Add tags to feature files:
```gherkin
@smoke @critical
Scenario: Your test
  Given some step
```

Then run:
```bash
CUCUMBER_TAGS="@smoke" npm test                    # @smoke only
CUCUMBER_TAGS="@smoke and @critical" npm test      # Both required
CUCUMBER_TAGS="@smoke or @regression" npm test     # Either tag
CUCUMBER_TAGS="not @wip" npm test                  # Exclude @wip
```

---

## That's It!

Pick a command and run it. Everything works. 🚀
