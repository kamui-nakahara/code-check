#include <stdio.h>

int main() {
  int numbers[100];
  int max = 0;
    
  for (int i = 0; i < 100; i++) {
      scanf("%d", &numbers[i]);
  }

  for (int i = 0; i < 100; i++) {
    if (numbers[i] > max) {
      max = numbers[i];
    }
  }
  printf("%d\n", max);
  return 0;
}
