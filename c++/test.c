#include <stdio.h>
#include <unistd.h>

#define ONE_MB (1024 * 1024)

int main()
{
    printf("The number of processors configured is :%ld\n",
        sysconf(_SC_NPROCESSORS_CONF));
    printf("The number of processors currently online (available) is :%ld\n",
        sysconf(_SC_NPROCESSORS_ONLN));
    return 0;
}