const possibleDirections = [ 'right', 'left', 'up', 'down' ];

const foundFinish = ( maze, loc ) => {
  // checks for the finish condition
  const bottom = maze.length - 1;
  const right = maze[0].length - 1;
  return loc.row === bottom && loc.col === right;
}

const getLocFromDirection = ( direction, loc ) => {
  // returns the new location given a current location and a direction
  // does not take into account maze dimensions or walls
  switch( direction ) {
    case 'left' : return { row: loc.row, col: loc.col - 1 }
    case 'right': return { row: loc.row, col: loc.col + 1 }
    case 'up'   : return { row: loc.row - 1, col: loc.col }
    case 'down' : return { row: loc.row + 1, col: loc.col }
  }
}

const isValid = ( maze, loc ) => {
  // returns true if the current location can be travelled through
  // returns false if the location is outside the matrix, in a wall, or already visited
  const inBounds = loc.row < maze.length && loc.col < maze[0].length && loc.row > -1 && loc.col > -1;
  const onPath = inBounds ? maze[loc.row][loc.col] === 0 : false;
  return onPath && inBounds;
}

const getValidPaths = ( maze, loc ) => {
  // returns an array of traversible directions in a given maze and location
  const paths = [];
  for ( let direction of possibleDirections ) {
    const newLoc = getLocFromDirection(direction, loc);
    if ( isValid( maze, newLoc ) ) {
      paths.push(direction);
    }
  }
  return paths;
}

const toggleVisited = ( maze, loc ) => {
  // toggles 2 in a new space
  // untoggles to 0 if the space has already been visited for backtracking
  maze[loc.row][loc.col] = maze[loc.row][loc.col] === 0 ? 2 : 0;
}

const generatePath = ( map ) => {
  // returns a matrix containing 1's for every space traversed in the solution
  const results = [];
  for ( let row in map ) {
    results.push([]);
    for ( let colVal of map[row] ) {
      if ( colVal === 2 ) {
        results[row].push(1);
      } else {
        results[row].push(0);
      }
    }
  }
  return results;
}

const solveMaze = ( maze ) => {
  // returns a matrix containing the path travelled only marked with 1’s
  // input is a matrix (nested array)
  // the start is always at [0,0]
  // the end is always at [length - 1, length - 1]
  // walls are represented by a 1
  // empty paths are represented by a 0

  // Track when we are done:
  let finished = false;

  // create a copy of the maze in order to not mutate the input
  const mazeMap = [...maze];

  const exploreMaze = ( loc ) => {
    // mark current location as visited
    toggleVisited(mazeMap, loc)

    // base case #1: we have found the finish location
    if ( foundFinish(mazeMap, loc) || finished ) {
      finished = true;
      return;
    } else {
      // find empty paths
      const validPaths = getValidPaths(mazeMap, loc);

      // base case #2: we are in a dead end
      if ( validPaths.length === 0 ) {
        return;
      }

      // try all our possible paths
      for ( let direction of validPaths ) {
        // move in the currently chosen direction
        const newLoc = getLocFromDirection(direction, loc);
        exploreMaze(newLoc);

        // go back if not at the finish
        if ( !finished ) {
          toggleVisited(mazeMap, newLoc)
        } else {
          // do not continue with checking choices if we are at the finish
          return;
        }
      }
    }
  }

  // start exploring the maze
  exploreMaze({row: 0, col: 0});

  // generate solution matrix and return it
  return generatePath(mazeMap);
}