"use strict";
// tslint:disable
// TODO: cleanup this file, it's copied as is from Angular CLI.
Object.defineProperty(exports, "__esModule", { value: true });
function calculateSizes(budget, compilation) {
    const calculatorMap = {
        all: AllCalculator,
        allScript: AllScriptCalculator,
        any: AnyCalculator,
        anyScript: AnyScriptCalculator,
        bundle: BundleCalculator,
        initial: InitialCalculator,
    };
    const ctor = calculatorMap[budget.type];
    const calculator = new ctor(budget, compilation);
    return calculator.calculate();
}
exports.calculateSizes = calculateSizes;
class Calculator {
    constructor(budget, compilation) {
        this.budget = budget;
        this.compilation = compilation;
    }
}
exports.Calculator = Calculator;
/**
 * A named bundle.
 */
class BundleCalculator extends Calculator {
    calculate() {
        const size = this.compilation.chunks
            .filter(chunk => chunk.name === this.budget.name)
            .reduce((files, chunk) => [...files, ...chunk.files], [])
            .map((file) => this.compilation.assets[file].size())
            .reduce((total, size) => total + size, 0);
        return [{ size, label: this.budget.name }];
    }
}
/**
 * The sum of all initial chunks (marked as initial by webpack).
 */
class InitialCalculator extends Calculator {
    calculate() {
        const initialChunks = this.compilation.chunks.filter(chunk => chunk.isOnlyInitial());
        const size = initialChunks
            .reduce((files, chunk) => [...files, ...chunk.files], [])
            .map((file) => this.compilation.assets[file].size())
            .reduce((total, size) => total + size, 0);
        return [{ size, label: 'initial' }];
    }
}
/**
 * The sum of all the scripts portions.
 */
class AllScriptCalculator extends Calculator {
    calculate() {
        const size = Object.keys(this.compilation.assets)
            .filter(key => /\.js$/.test(key))
            .map(key => this.compilation.assets[key])
            .map(asset => asset.size())
            .reduce((total, size) => total + size, 0);
        return [{ size, label: 'total scripts' }];
    }
}
/**
 * All scripts and assets added together.
 */
class AllCalculator extends Calculator {
    calculate() {
        const size = Object.keys(this.compilation.assets)
            .map(key => this.compilation.assets[key].size())
            .reduce((total, size) => total + size, 0);
        return [{ size, label: 'total' }];
    }
}
/**
 * Any script, individually.
 */
class AnyScriptCalculator extends Calculator {
    calculate() {
        return Object.keys(this.compilation.assets)
            .filter(key => /\.js$/.test(key))
            .map(key => {
            const asset = this.compilation.assets[key];
            return {
                size: asset.size(),
                label: key
            };
        });
    }
}
/**
 * Any script or asset (images, css, etc).
 */
class AnyCalculator extends Calculator {
    calculate() {
        return Object.keys(this.compilation.assets)
            .map(key => {
            const asset = this.compilation.assets[key];
            return {
                size: asset.size(),
                label: key
            };
        });
    }
}
/**
 * Calculate the bytes given a string value.
 */
function calculateBytes(val, baseline, factor) {
    if (/^\d+$/.test(val)) {
        return parseFloat(val);
    }
    if (/^(\d+)%$/.test(val)) {
        return calculatePercentBytes(val, baseline, factor);
    }
    const multiplier = getMultiplier(val);
    const numberVal = parseFloat(val.replace(/((k|m|M|)b?)$/, ''));
    const baselineVal = baseline ? parseFloat(baseline.replace(/((k|m|M|)b?)$/, '')) : 0;
    const baselineMultiplier = baseline ? getMultiplier(baseline) : 1;
    const factorMultiplier = factor ? (factor === 'pos' ? 1 : -1) : 1;
    return numberVal * multiplier + baselineVal * baselineMultiplier * factorMultiplier;
}
exports.calculateBytes = calculateBytes;
function getMultiplier(val) {
    if (/^(\d+)b?$/.test(val)) {
        return 1;
    }
    else if (/^(\d+)kb$/.test(val)) {
        return 1000;
    }
    else if (/^(\d+)(m|M)b$/.test(val)) {
        return 1000 * 1000;
    }
    else {
        return 1;
    }
}
function calculatePercentBytes(val, baseline, factor) {
    const baselineBytes = calculateBytes(baseline);
    const percentage = parseFloat(val.replace(/%/g, ''));
    return baselineBytes + baselineBytes * percentage / 100 * (factor === 'pos' ? 1 : -1);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLWNhbGN1bGF0b3IuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX2FuZ3VsYXIvc3JjL2FuZ3VsYXItY2xpLWZpbGVzL3V0aWxpdGllcy9idW5kbGUtY2FsY3VsYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsaUJBQWlCO0FBQ2pCLCtEQUErRDs7QUF1Qi9ELHdCQUErQixNQUFjLEVBQUUsV0FBd0I7SUFDckUsTUFBTSxhQUFhLEdBQUc7UUFDcEIsR0FBRyxFQUFFLGFBQWE7UUFDbEIsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QixHQUFHLEVBQUUsYUFBYTtRQUNsQixTQUFTLEVBQUUsbUJBQW1CO1FBQzlCLE1BQU0sRUFBRSxnQkFBZ0I7UUFDeEIsT0FBTyxFQUFFLGlCQUFpQjtLQUMzQixDQUFDO0lBQ0YsTUFBTSxJQUFJLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxNQUFNLFVBQVUsR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsT0FBTyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7QUFDaEMsQ0FBQztBQVpELHdDQVlDO0FBRUQ7SUFDRSxZQUF1QixNQUFjLEVBQVksV0FBd0I7UUFBbEQsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFZLGdCQUFXLEdBQVgsV0FBVyxDQUFhO0lBQUcsQ0FBQztDQUc5RTtBQUpELGdDQUlDO0FBRUQ7O0dBRUc7QUFDSCxzQkFBdUIsU0FBUSxVQUFVO0lBQ3ZDLFNBQVM7UUFDUCxNQUFNLElBQUksR0FBVyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU07YUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNoRCxNQUFNLENBQUMsQ0FBQyxLQUFLLEVB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aUIsRUFBRSxNQUF3QjtJQUNyRixNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUMsUUFBa0IsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sVUFBVSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3JELE9BQU8sYUFBYSxHQUFHLGFBQWEsR0FBRyxVQUFVLEdBQUcsR0FBRyxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ3hGLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB0c2xpbnQ6ZGlzYWJsZVxuLy8gVE9ETzogY2xlYW51cCB0aGlzIGZpbGUsIGl0J3MgY29waWVkIGFzIGlzIGZyb20gQW5ndWxhciBDTEkuXG5cbi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7IEJ1ZGdldCB9IGZyb20gJy4uLy4uL2Jyb3dzZXIvc2NoZW1hJztcblxuZXhwb3J0IGludGVyZmFjZSBDb21waWxhdGlvbiB7XG4gIGFzc2V0czogYW55O1xuICBjaHVua3M6IGFueVtdO1xuICB3YXJuaW5nczogc3RyaW5nW107XG4gIGVycm9yczogc3RyaW5nW107XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2l6ZSB7XG4gIHNpemU6IG51bWJlcjtcbiAgbGFiZWw/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVTaXplcyhidWRnZXQ6IEJ1ZGdldCwgY29tcGlsYXRpb246IENvbXBpbGF0aW9uKTogU2l6ZVtdIHtcbiAgY29uc3QgY2FsY3VsYXRvck1hcCA9IHtcbiAgICBhbGw6IEFsbENhbGN1bGF0b3IsXG4gICAgYWxsU2NyaXB0OiBBbGxTY3JpcHRDYWxjdWxhdG9yLFxuICAgIGFueTogQW55Q2FsY3VsYXRvcixcbiAgICBhbnlTY3JpcHQ6IEFueVNjcmlwdENhbGN1bGF0b3IsXG4gICAgYnVuZGxlOiBCdW5kbGVDYWxjdWxhdG9yLFxuICAgIGluaXRpYWw6IEluaXRpYWxDYWxjdWxhdG9yLFxuICB9O1xuICBjb25zdCBjdG9yID0gY2FsY3VsYXRvck1hcFtidWRnZXQudHlwZV07XG4gIGNvbnN0IGNhbGN1bGF0b3IgPSBuZXcgY3RvcihidWRnZXQsIGNvbXBpbGF0aW9uKTtcbiAgcmV0dXJuIGNhbGN1bGF0b3IuY2FsY3VsYXRlKCk7XG59XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDYWxjdWxhdG9yIHtcbiAgY29uc3RydWN0b3IgKHByb3RlY3RlZCBidWRnZXQ6IEJ1ZGdldCwgcHJvdGVjdGVkIGNvbXBpbGF0aW9uOiBDb21waWxhdGlvbikge31cblxuICBhYnN0cmFjdCBjYWxjdWxhdGUoKTogU2l6ZVtdO1xufVxuXG4vKipcbiAqIEEgbmFtZWQgYnVuZGxlLlxuICovXG5jbGFzcyBCdW5kbGVDYWxjdWxhdG9yIGV4dGVuZHMgQ2FsY3VsYXRvciB7XG4gIGNhbGN1bGF0ZSgpIHtcbiAgICBjb25zdCBzaXplOiBudW1iZXIgPSB0aGlzLmNvbXBpbGF0aW9uLmNodW5rc1xuICAgICAgLmZpbHRlcihjaHVuayA9PiBjaHVuay5uYW1lID09PSB0aGlzLmJ1ZGdldC5uYW1lKVxuICAgICAgLnJlZHVjZSgoZmlsZXMsIGNodW5rKSA9PiBbLi4uZmlsZXMsIC4uLmNodW5rLmZpbGVzXSwgW10pXG4gICAgICAubWFwKChmaWxlOiBzdHJpbmcpID0+IHRoaXMuY29tcGlsYXRpb24uYXNzZXRzW2ZpbGVdLnNpemUoKSlcbiAgICAgIC5yZWR1Y2UoKHRvdGFsOiBudW1iZXIsIHNpemU6IG51bWJlcikgPT4gdG90YWwgKyBzaXplLCAwKTtcbiAgICByZXR1cm4gW3tzaXplLCBsYWJlbDogdGhpcy5idWRnZXQubmFtZX1dO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHN1bSBvZiBhbGwgaW5pdGlhbCBjaHVua3MgKG1hcmtlZCBhcyBpbml0aWFsIGJ5IHdlYnBhY2spLlxuICovXG5jbGFzcyBJbml0aWFsQ2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3Ige1xuICBjYWxjdWxhdGUoKSB7XG4gICAgY29uc3QgaW5pdGlhbENodW5rcyA9IHRoaXMuY29tcGlsYXRpb24uY2h1bmtzLmZpbHRlcihjaHVuayA9PiBjaHVuay5pc09ubHlJbml0aWFsKCkpO1xuICAgIGNvbnN0IHNpemU6IG51bWJlciA9IGluaXRpYWxDaHVua3NcbiAgICAgIC5yZWR1Y2UoKGZpbGVzLCBjaHVuaykgPT4gWy4uLmZpbGVzLCAuLi5jaHVuay5maWxlc10sIFtdKVxuICAgICAgLm1hcCgoZmlsZTogc3RyaW5nKSA9PiB0aGlzLmNvbXBpbGF0aW9uLmFzc2V0c1tmaWxlXS5zaXplKCkpXG4gICAgICAucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IHRvdGFsICsgc2l6ZSwgMCk7XG4gICAgcmV0dXJuIFt7c2l6ZSwgbGFiZWw6ICdpbml0aWFsJ31dO1xuICB9XG59XG5cbi8qKlxuICogVGhlIHN1bSBvZiBhbGwgdGhlIHNjcmlwdHMgcG9ydGlvbnMuXG4gKi9cbmNsYXNzIEFsbFNjcmlwdENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yIHtcbiAgY2FsY3VsYXRlKCkge1xuICAgIGNvbnN0IHNpemU6IG51bWJlciA9IE9iamVjdC5rZXlzKHRoaXMuY29tcGlsYXRpb24uYXNzZXRzKVxuICAgICAgLmZpbHRlcihrZXkgPT4gL1xcLmpzJC8udGVzdChrZXkpKVxuICAgICAgLm1hcChrZXkgPT4gdGhpcy5jb21waWxhdGlvbi5hc3NldHNba2V5XSlcbiAgICAgIC5tYXAoYXNzZXQgPT4gYXNzZXQuc2l6ZSgpKVxuICAgICAgLnJlZHVjZSgodG90YWw6IG51bWJlciwgc2l6ZTogbnVtYmVyKSA9PiB0b3RhbCArIHNpemUsIDApO1xuICAgIHJldHVybiBbe3NpemUsIGxhYmVsOiAndG90YWwgc2NyaXB0cyd9XTtcbiAgfVxufVxuXG4vKipcbiAqIEFsbCBzY3JpcHRzIGFuZCBhc3NldHMgYWRkZWQgdG9nZXRoZXIuXG4gKi9cbmNsYXNzIEFsbENhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yIHtcbiAgY2FsY3VsYXRlKCkge1xuICAgIGNvbnN0IHNpemU6IG51bWJlciA9IE9iamVjdC5rZXlzKHRoaXMuY29tcGlsYXRpb24uYXNzZXRzKVxuICAgICAgLm1hcChrZXkgPT4gdGhpcy5jb21waWxhdGlvbi5hc3NldHNba2V5XS5zaXplKCkpXG4gICAgICAucmVkdWNlKCh0b3RhbDogbnVtYmVyLCBzaXplOiBudW1iZXIpID0+IHRvdGFsICsgc2l6ZSwgMCk7XG4gICAgcmV0dXJuIFt7c2l6ZSwgbGFiZWw6ICd0b3RhbCd9XTtcbiAgfVxufVxuXG4vKipcbiAqIEFueSBzY3JpcHQsIGluZGl2aWR1YWxseS5cbiAqL1xuY2xhc3MgQW55U2NyaXB0Q2FsY3VsYXRvciBleHRlbmRzIENhbGN1bGF0b3Ige1xuICBjYWxjdWxhdGUoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuY29tcGlsYXRpb24uYXNzZXRzKVxuICAgICAgLmZpbHRlcihrZXkgPT4gL1xcLmpzJC8udGVzdChrZXkpKVxuICAgICAgLm1hcChrZXkgPT4ge1xuICAgICAgICBjb25zdCBhc3NldCA9IHRoaXMuY29tcGlsYXRpb24uYXNzZXRzW2tleV07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc2l6ZTogYXNzZXQuc2l6ZSgpLFxuICAgICAgICAgIGxhYmVsOiBrZXlcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQW55IHNjcmlwdCBvciBhc3NldCAoaW1hZ2VzLCBjc3MsIGV0YykuXG4gKi9cbmNsYXNzIEFueUNhbGN1bGF0b3IgZXh0ZW5kcyBDYWxjdWxhdG9yIHtcbiAgY2FsY3VsYXRlKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbXBpbGF0aW9uLmFzc2V0cylcbiAgICAgIC5tYXAoa2V5ID0+IHtcbiAgICAgICAgY29uc3QgYXNzZXQgPSB0aGlzLmNvbXBpbGF0aW9uLmFzc2V0c1trZXldO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHNpemU6IGFzc2V0LnNpemUoKSxcbiAgICAgICAgICBsYWJlbDoga2V5XG4gICAgICAgIH07XG4gICAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIENhbGN1bGF0ZSB0aGUgYnl0ZXMgZ2l2ZW4gYSBzdHJpbmcgdmFsdWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVCeXRlcyh2YWw6IHN0cmluZywgYmFzZWxpbmU/OiBzdHJpbmcsIGZhY3Rvcj86ICgncG9zJyB8ICduZWcnKSk6IG51bWJlciB7XG4gIGlmICgvXlxcZCskLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWwpO1xuICB9XG5cbiAgaWYgKC9eKFxcZCspJSQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBjYWxjdWxhdGVQZXJjZW50Qnl0ZXModmFsLCBiYXNlbGluZSwgZmFjdG9yKTtcbiAgfVxuXG4gIGNvbnN0IG11bHRpcGxpZXIgPSBnZXRNdWx0aXBsaWVyKHZhbCk7XG5cbiAgY29uc3QgbnVtYmVyVmFsID0gcGFyc2VGbG9hdCh2YWwucmVwbGFjZSgvKChrfG18TXwpYj8pJC8sICcnKSk7XG4gIGNvbnN0IGJhc2VsaW5lVmFsID0gYmFzZWxpbmUgPyBwYXJzZUZsb2F0KGJhc2VsaW5lLnJlcGxhY2UoLygoa3xtfE18KWI/KSQvLCAnJykpIDogMDtcbiAgY29uc3QgYmFzZWxpbmVNdWx0aXBsaWVyID0gYmFzZWxpbmUgPyBnZXRNdWx0aXBsaWVyKGJhc2VsaW5lKSA6IDE7XG4gIGNvbnN0IGZhY3Rvck11bHRpcGxpZXIgPSBmYWN0b3IgPyAoZmFjdG9yID09PSAncG9zJyA/IDEgOiAtMSkgOiAxO1xuXG4gIHJldHVybiBudW1iZXJWYWwgKiBtdWx0aXBsaWVyICsgYmFzZWxpbmVWYWwgKiBiYXNlbGluZU11bHRpcGxpZXIgKiBmYWN0b3JNdWx0aXBsaWVyO1xufVxuXG5mdW5jdGlvbiBnZXRNdWx0aXBsaWVyKHZhbDogc3RyaW5nKTogbnVtYmVyIHtcbiAgaWYgKC9eKFxcZCspYj8kLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gMTtcbiAgfSBlbHNlIGlmICgvXihcXGQrKWtiJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIDEwMDA7XG4gIH0gZWxzZSBpZiAoL14oXFxkKykobXxNKWIkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gMTAwMCAqIDEwMDA7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIDE7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlUGVyY2VudEJ5dGVzKHZhbDogc3RyaW5nLCBiYXNlbGluZT86IHN0cmluZywgZmFjdG9yPzogKCdwb3MnIHwgJ25lZycpKTogbnVtYmVyIHtcbiAgY29uc3QgYmFzZWxpbmVCeXRlcyA9IGNhbGN1bGF0ZUJ5dGVzKGJhc2VsaW5lIGFzIHN0cmluZyk7XG4gIGNvbnN0IHBlcmNlbnRhZ2UgPSBwYXJzZUZsb2F0KHZhbC5yZXBsYWNlKC8lL2csICcnKSk7XG4gIHJldHVybiBiYXNlbGluZUJ5dGVzICsgYmFzZWxpbmVCeXRlcyAqIHBlcmNlbnRhZ2UgLyAxMDAgKiAoZmFjdG9yID09PSAncG9zJyA/IDEgOiAtMSk7XG59XG4iXX0=