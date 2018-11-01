"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
class TestLogger extends core_1.logging.Logger {
    constructor(name, parent = null) {
        super(name, parent);
        this._latestEntries = [];
        this.subscribe((entry) => this._latestEntries.push(entry));
    }
    clear() {
        this._latestEntries = [];
    }
    includes(message) {
        return this._latestEntries.some((entry) => entry.message.includes(message));
    }
    test(re) {
        return this._latestEntries.some((entry) => re.test(entry.message));
    }
}
exports.TestLogger = TestLogger;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC1sb2dnZXIuanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2FyY2hpdGVjdC90ZXN0aW5nL3Rlc3QtbG9nZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBRUgsK0NBQStDO0FBRy9DLGdCQUF3QixTQUFRLGNBQU8sQ0FBQyxNQUFNO0lBRTVDLFlBQVksSUFBWSxFQUFFLFNBQWdDLElBQUk7UUFDNUQsS0FBSyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztRQUZkLG1CQUFjLEdBQXVCLEVBQUUsQ0FBQztRQUc5QyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzdELENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLGNBQWMsR0FBRyxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELFFBQVEsQ0FBQyxPQUFlO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7SUFDOUUsQ0FBQztJQUVELElBQUksQ0FBQyxFQUFVO1FBQ2IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0NBQ0Y7QUFsQkQsZ0NBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgeyBsb2dnaW5nIH0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2NvcmUnO1xuXG5cbmV4cG9ydCBjbGFzcyBUZXN0TG9nZ2VyIGV4dGVuZHMgbG9nZ2luZy5Mb2dnZXIge1xuICBwcml2YXRlIF9sYXRlc3RFbnRyaWVzOiBsb2dnaW5nLkxvZ0VudHJ5W10gPSBbXTtcbiAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLCBwYXJlbnQ6IGxvZ2dpbmcuTG9nZ2VyIHwgbnVsbCA9IG51bGwpIHtcbiAgICBzdXBlcihuYW1lLCBwYXJlbnQpO1xuICAgIHRoaXMuc3Vic2NyaWJlKChlbnRyeSkgPT4gdGhpcy5fbGF0ZXN0RW50cmllcy5wdXNoKGVudHJ5KSk7XG4gIH1cblxuICBjbGVhcigpIHtcbiAgICB0aGlzLl9sYXRlc3RFbnRyaWVzID0gW107XG4gIH1cblxuICBpbmNsdWRlcyhtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0RW50cmllcy5zb21lKChlbnRyeSkgPT4gZW50cnkubWVzc2FnZS5pbmNsdWRlcyhtZXNzYWdlKSk7XG4gIH1cblxuICB0ZXN0KHJlOiBSZWdFeHApIHtcbiAgICByZXR1cm4gdGhpcy5fbGF0ZXN0RW50cmllcy5zb21lKChlbnRyeSkgPT4gcmUudGVzdChlbnRyeS5tZXNzYWdlKSk7XG4gIH1cbn1cbiJdfQ==