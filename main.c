#include <stdio.h>

int main() {
    const int SIZE = 10;
    int arr[SIZE] = { 10 };
    for (int i = 0; i < SIZE; i++) {
        printf("%d\n", arr[i]);
    }
    return 0;
}