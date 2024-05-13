#include <stdio.h>
int main()
{
  int a[10];
  int b;
  for (int i=0;i<10;i++)
  {
  scanf("%d",&a[i]);
  }
  for (int i=0;i<10;i++)
  {
    for (int ii=0;ii<9;ii++)
    {
      if (a[ii]<a[ii+1])
      {
        b=a[ii];
        a[ii]=a[ii+1];
        a[ii+1]=b;
      }
    }
  }
  for (int i=0;i<10;i++)
  {
    printf("%d",a[i]);
    if (i!=9){
        printf(" ");
    }
  }
  return 0;
}
