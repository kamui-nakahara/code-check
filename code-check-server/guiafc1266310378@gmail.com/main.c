#include <stdio.h>
int a=5;
int test(){
  return a*a;
}
int main(void){
  printf("%d\n",a);
  printf("%d\n",test());
  return 0;
}