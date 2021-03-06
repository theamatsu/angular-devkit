"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function buildJsonPointer(fragments) {
    return ('/' + fragments.map(f => {
        return f.replace(/~/g, '~0')
            .replace(/\//g, '~1');
    }).join('/'));
}
exports.buildJsonPointer = buildJsonPointer;
function joinJsonPointer(root, ...others) {
    if (root == '/') {
        return buildJsonPointer(others);
    }
    return (root + buildJsonPointer(others));
}
exports.joinJsonPointer = joinJsonPointer;
function parseJsonPointer(pointer) {
    if (pointer === '') {
        return [];
    }
    if (pointer.charAt(0) !== '/') {
        throw new Error('Relative pointer: ' + pointer);
    }
    return pointer.substring(1).split(/\//).map(str => str.replace(/~1/g, '/').replace(/~0/g, '~'));
}
exports.parseJsonPointer = parseJsonPointer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9pbnRlci5qcyIsInNvdXJjZVJvb3QiOiIuLyIsInNvdXJjZXMiOlsicGFja2FnZXMvYW5ndWxhcl9kZXZraXQvY29yZS9zcmMvanNvbi9zY2hlbWEvcG9pbnRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVVBLDBCQUFpQyxTQUFtQjtJQUNsRCxPQUFPLENBQ0wsR0FBRyxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDdEIsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUM7YUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQ0UsQ0FBQztBQUNuQixDQUFDO0FBUEQsNENBT0M7QUFDRCx5QkFBZ0MsSUFBaUIsRUFBRSxHQUFHLE1BQWdCO0lBQ3BFLElBQUksSUFBSSxJQUFJLEdBQUcsRUFBRTtRQUNmLE9BQU8sZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDakM7SUFFRCxPQUFPLENBQUMsSUFBSSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFnQixDQUFDO0FBQzFELENBQUM7QUFORCwwQ0FNQztBQUNELDBCQUFpQyxPQUFvQjtJQUNuRCxJQUFJLE9BQU8sS0FBSyxFQUFFLEVBQUU7UUFBRSxPQUFPLEVBQUUsQ0FBQztLQUFFO0lBQ2xDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFBRSxNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixHQUFHLE9BQU8sQ0FBQyxDQUFDO0tBQUU7SUFFbkYsT0FBTyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7QUFDbEcsQ0FBQztBQUxELDRDQUtDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgSnNvblBvaW50ZXIgfSBmcm9tICcuL2ludGVyZmFjZSc7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSnNvblBvaW50ZXIoZnJhZ21lbnRzOiBzdHJpbmdbXSk6IEpzb25Qb2ludGVyIHtcbiAgcmV0dXJuIChcbiAgICAnLycgKyBmcmFnbWVudHMubWFwKGYgPT4ge1xuICAgICAgcmV0dXJuIGYucmVwbGFjZSgvfi9nLCAnfjAnKVxuICAgICAgICAgICAgICAucmVwbGFjZSgvXFwvL2csICd+MScpO1xuICAgIH0pLmpvaW4oJy8nKVxuICApIGFzIEpzb25Qb2ludGVyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGpvaW5Kc29uUG9pbnRlcihyb290OiBKc29uUG9pbnRlciwgLi4ub3RoZXJzOiBzdHJpbmdbXSk6IEpzb25Qb2ludGVyIHtcbiAgaWYgKHJvb3QgPT0gJy8nKSB7XG4gICAgcmV0dXJuIGJ1aWxkSnNvblBvaW50ZXIob3RoZXJzKTtcbiAgfVxuXG4gIHJldHVybiAocm9vdCArIGJ1aWxkSnNvblBvaW50ZXIob3RoZXJzKSkgYXMgSnNvblBvaW50ZXI7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2VKc29uUG9pbnRlcihwb2ludGVyOiBKc29uUG9pbnRlcik6IHN0cmluZ1tdIHtcbiAgaWYgKHBvaW50ZXIgPT09ICcnKSB7IHJldHVybiBbXTsgfVxuICBpZiAocG9pbnRlci5jaGFyQXQoMCkgIT09ICcvJykgeyB0aHJvdyBuZXcgRXJyb3IoJ1JlbGF0aXZlIHBvaW50ZXI6ICcgKyBwb2ludGVyKTsgfVxuXG4gIHJldHVybiBwb2ludGVyLnN1YnN0cmluZygxKS5zcGxpdCgvXFwvLykubWFwKHN0ciA9PiBzdHIucmVwbGFjZSgvfjEvZywgJy8nKS5yZXBsYWNlKC9+MC9nLCAnficpKTtcbn1cbiJdfQ==